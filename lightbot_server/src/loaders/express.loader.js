// // Config imports
const config = require('../config')

// // Library imports
const express = require('express')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const cors = require('cors')
const colors = require('colors')

// // Route imports
const userRoute = require('../api/routes/User.route')
const dataRoute = require('../api/routes/Data.route')
const errorRoute = require('../api/routes/Error.route')
const liveRoute = require('../api/routes/Live.route')
const configRoute = require('../api/routes/Config.route')

// // Handler imports
const errorHandler = require('../services/Errorhandling.service')

module.exports = ({ app }) => {
  /**
   *
   * Allow for body decryption to json
   */
  app.use(express.json({ extended: true }))

  /**
   *
   * Allow for body decryption to json
   */
  app.set('view engine', 'ejs')

  /**
   * Health Check endpoints
   * To test server health from loadbalancers (AWS etc)
   */
  app.get('/status', (req, res) => {
    res.status(200).end()
  })
  app.head('/status', (req, res) => {
    res.status(200).end()
  })

  /**
   * Proxy enabler
   * To use behind reverse proxy (Heroku, Nginx, etc)
   */
  //app.enable('trust proxy')

  /**
   * Enable helmet for security headers
   *
   */
  app.use(helmet())

  /**
   * Configures the Access-Control-Allow-Origin using CORS
   * Sets to localhost or production domain depending on environment
   */
  var xorigin =
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:3000/'
      : 'https://lightbot.co.za/'
  cors: {
    origin: xorigin
  }
  app.use(cors())

  /**
   * Enable Rate Limiting
   * 100 requests allowed per 10 minutes
   */
  const limit = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message:
      'Exceeded request limit. Please wait 10 minutes before trying again.',
    headers: true,
  })
  app.use(limit)

  /**
   * Serve the root of the directory
   *
   */
  app.use(express.static(__dirname + '../../'))

  /**
   * Route handling
   * User, Data, Live, Config, Error
   */

  app.use('/user', userRoute)
  app.use('/data', dataRoute)
  app.use('/live', liveRoute)
  app.use('/config', configRoute)
  app.use(errorRoute)

  /**
   * Error handling
   * Error, PromiseRejections
   */
  app.use(errorHandler)
}
