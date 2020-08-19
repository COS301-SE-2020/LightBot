const { Unauthorized } = require("./Error.util.js") 
const whitelist = ['http://localhost:3000']

module.exports = {
    // origin: function (origin, callback) {
    //   if (whitelist.indexOf(origin) !== -1) {
    //     callback(null, true)
    //   } else {
    //     callback(new Unauthorized('Not allowed by CORS'))
    //   }
    // },
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  }