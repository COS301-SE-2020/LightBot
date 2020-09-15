// // Library imports
const asyncHandler = require('express-async-handler')
const { spawn } = require('child_process')
const path = require('path')

function runScript() {
  return spawn('python', [path.join(__dirname, './TestMain.py')])
}

// // Model imports
const { ErrorResponse } = require('../../../models/Error.model')
const { SuccessResponse } = require('../../../models/Success.model')

module.exports = {
  runSimulation: asyncHandler(async (req, res, next) => {
    console.log('here')
    let dataToSend
    const subprocess = runScript()
    // print output of script
    subprocess.stdout.on('data', (data) => {
      dataToSend = data.toString()
    })
    subprocess.stderr.on('data', (data) => {
      dataToSend = data.toString()
      //res.send(dataToSend)
    })
    subprocess.stderr.on('close', () => {
      console.log('Closed')
      res.send(dataToSend)
    })
  }),
}
