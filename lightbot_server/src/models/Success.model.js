class SuccessResponse {
  constructor(message, data) {
    this.success = {
      status: 200,
      message: message,
      data: data,
    }
  }
}

module.exports = {
  SuccessResponse,
}
