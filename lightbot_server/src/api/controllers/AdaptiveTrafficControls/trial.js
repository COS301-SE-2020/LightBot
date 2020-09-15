const { spawn } = require('child_process')
const path = require('path')
function runScript(){
  const subprocess = spawn('python', [
        path.join(__dirname, './TestMain.py')
  ]);
  
}
runScript()