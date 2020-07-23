const mongoose = require('mongoose')

module.exports = async () => {
  mongoose.connect(
    process.env.URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  mongoose.connection.on('connected', () =>
    console.log(
      `Connected to Management MongoDB ${mongoose.connection.host}`.magenta
        .underline
    )
  )
  mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
  )
  mongoose.connection.on('disconnected', () =>
    console.log(
      `Disconnected from Management MongoDB ${mongoose.connection.host}`.magenta
        .underline
    )
  )
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.info(`SIGINT signal received. Server shutdown...`.red.underline)
      process.exit(0)
    })
  })
}
