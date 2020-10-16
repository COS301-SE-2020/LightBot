// // Loader imports
const expressLoader = require('./express.loader')
const dbLoader = require('./db.loader')

module.exports = async ({ expressApp }) => {
  dbLoader()
  expressLoader({ app: expressApp })
}
