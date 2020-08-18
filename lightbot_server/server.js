//Packages Node core modules, Third-Party libs
var compression = require('compression')
var https = require('https')
var fs = require('fs')
require('colors')
const rateLimit = require('express-rate-limit')
require('dotenv').config({ path: './config/config.vars.env' })
const express = require('express')
const app = express()
var helmet = require('helmet')

//Ports
const PORT = process.env.PORT || 3000

//Database Connection
require('./utils/DBConnector.util')()

//Init Middleware
// Rate limiting
const limit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
})
var options = {
  key: fs.readFileSync('./certs/server-key.pem'),
  cert: fs.readFileSync('./certs/server-cert.pem')
}
app.use(limit)
app.use(helmet())
app.use(express.json({ extended: true }))
app.use(compression())
app.use(require('cors')(require('./utils/Cors.util')))
app.use(express.static(__dirname + '../lightbot_web/'))

//  Landing Page
//  Serve static webpage in production
//
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

//Route Handlers
//User Route
app.use('/user', require('./routes/User.route'))
//Data Route
app.use('/data', require('./routes/Data.route'))
//Error Route
app.use(require('./routes/Error.route'))

//Error Handler
app.use(require('./middleware/Error.handler'))

//Execute server on port specified by environment var or default
const server = https.createServer(app).listen(PORT, () =>
  console.log(`Server listening on port: ${PORT}`.cyan)
)

require('./utils/SocketService.util')(server)
require('./utils/Promiserejection.handler')
module.exports = app
