// // Library imports
const asyncHandler = require('express-async-handler')
const { spawn } = require('child_process')

// // Service imports
//var bat = require.resolve('../../services/OptimizerService/run.bat')
//var bat2 = require.resolve('../../services/OptimizerService/run2.bat')
var bat = require.resolve('../../services/OptimizerService/runx.sh')
var bat2 = require.resolve('../../services/OptimizerService/runy.sh')
const editfile = require('../../services/Edit.service')


// // Model imports
const { ErrorResponse } = require('../../models/Error.model')
const { SuccessResponse } = require('../../models/Success.model')

module.exports = {
  runSimulation: asyncHandler(async (req, res, next) => {
    const info = req.params.id
    const v = info.substring(0,info.indexOf(':'))
    const d = info.substring(info.indexOf(':')+1)
    editfile.Automatic(v,d)
    editfile.Manual(v,d)
    let dataToSend
    const subprocess = spawn(bat)
    const subprocess2 = spawn(bat2)
    // print output of script
    subprocess.stdout.on('data', (data) => {
      dataToSend = data.toString()
    })
    subprocess.stderr.on('data', (data) => {
      dataToSend = data.toString()
      //res.send(dataToSend)
    })

    subprocess2.stdout.on('data', (data) => {
      dataToSend = data.toString()
    })
    subprocess2.stderr.on('data', (data) => {
      dataToSend = data.toString()
      //res.send(dataToSend)
    })

    subprocess.stderr.on('close', (code) => {
      if (code == 0)
        res.send(
          new SuccessResponse('Successfully ran simulation.', dataToSend)
        )
      else
        return next(
          new ErrorResponse('Something went wrong could not run sub process.')
        )
    })
  }),
}
