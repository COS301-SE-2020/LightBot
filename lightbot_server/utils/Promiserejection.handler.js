module.exports = process.on('unhandledRejection', (error, promise) => {
    console.log(`Error: ${error.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
  });