const app = require('express')()
const serverLoader = require('../src/loaders/express.loader')
serverLoader({ app: app })
const supertest = require('supertest')
const request = supertest(app)

describe('Invalid Endpoint Check', () => {
  it('GET - Should return 404 Not found', async () => {
    const res = await request.get('/random')
    expect(res.statusCode).toEqual(404)
    expect(res.body.error.status).toEqual(404)
    expect(res.body.error.message).toEqual("Resource not found")
  })
})