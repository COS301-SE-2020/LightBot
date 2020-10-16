module.exports = async ({ app }) => {
  process.on('unhandledRejection', (error, promise) => {
    console.log(`Error: ${error.message}`.green)
    // // Close server & exit process
    app.close(() => process.exit(1))
  })
}
