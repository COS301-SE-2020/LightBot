class ErrorResponse extends Error {
  constructor(message, data) {
    super(message)
    this.data = data
  }
  getCode(){
    if(this instanceof BadRequest)
      return 400;
    if(this instanceof Unauthorized)
      return 401;
    if(this instanceof Forbidden)
      return 403;
    if(this instanceof NotFound)
      return 404;
  }
}

class BadRequest extends ErrorResponse {}
class Unauthorized extends ErrorResponse {}
class Forbidden extends ErrorResponse {}
class NotFound extends ErrorResponse {}

module.exports = {
  ErrorResponse,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound
}
