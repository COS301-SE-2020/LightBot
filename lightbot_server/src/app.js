// // Config imports
const config = require('./config')

// // Library imports
const express = require('express')

const prHandler = require('./services/Promiserejectionhandling.service')

async function executeServer() {
  const app = express()
  await require('./loaders')({ expressApp: app })

  const server = app.listen(config.port, () =>
    console.log(`Server listening on port: ${config.port}`.cyan)
  )
  //prHandler({app:server})
}

executeServer()
