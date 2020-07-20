//Packages Node core modules, Third-Party libs
require('colors');
require('dotenv').config({ path: './config/config.vars.env' });
const express = require('express')
const app = express()

//Ports
const PORT = process.env.PORT || 3000

//Database Connection
require('./utils/DBConnector.util')()

//Socket Service
//require('./utils/SocketService.util')

//Init Middleware
app.use(express.json({ extended: true }))
app.use(require('cors')(require('./utils/Cors.util')))
app.use(express.static(__dirname + '../lightbot_web/'))

//Landing Page / API Explainer
app.get('/', (req, res, next) => {
  res.sendFile('index.html')
})

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
let server = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`.cyan))

module.exports = server