const fs = require('fs')

module.exports = {
  Automatic: async (v, d) => {
    let count = 0
    let str = ''
    let line = fs
      .readFileSync('src/services/OptimizerService/Settings/TestSettingsA.ini')
      .toString()
      .split('\n')
    for (let index = 0; index < line.length; index++) {
      if (index == 2) line[index] = line[index].substr(0, 12) + d
      if (index == 3) line[index] = line[index].substr(0, 19) + v
      str += line[index] + '\n'
    }
    fs.writeFileSync(
      'src/services/OptimizerService/Settings/TestSettingsA.ini',
      str
    )
  },
  Manual: async (v, d) => {
    let count = 0
    let str = ''
    let line = fs
      .readFileSync('src/services/OptimizerService/Settings/TestSettingsM.ini')
      .toString()
      .split('\n')
    for (let index = 0; index < line.length; index++) {
      if (index == 2) line[index] = line[index].substr(0, 12) + d
      if (index == 3) line[index] = line[index].substr(0, 19) + v
      str += line[index] + '\n'
    }
    fs.writeFileSync(
      'src/services/OptimizerService/Settings/TestSettingsM.ini',
      str
    )
  },
}
