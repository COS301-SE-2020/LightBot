const {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  ErrorResponse,
} = require('../src/models/Error.model')

describe('Error Response Check', () => {
  it('BadRequest should have code 400', () => {
    const result = new BadRequest('Example', 'Example')
    expect(result.getCode()).toEqual(400)
  })
  it('Unauthorized should have code 401', () => {
    const result = new Unauthorized('Example', 'Example')
    expect(result.getCode()).toEqual(401)
  })
  it('Forbidden should have code 400', () => {
    const result = new Forbidden('Example', 'Example')
    expect(result.getCode()).toEqual(403)
  })
  it('NotFound should have code 404', () => {
    const result = new NotFound('Example', 'Example')
    expect(result.getCode()).toEqual(404)
  })
  it('ErrorResponse should have code 500', () => {
    const result = new ErrorResponse('Example', 'Example')
    expect(result.getCode()).toEqual(500)
  })
})
