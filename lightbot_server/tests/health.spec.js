const app = require('express')()
const serverLoader = require('../src/loaders/express.loader')
serverLoader({ app: app })
const supertest = require('supertest')
const request = supertest(app)

describe('Health Check', () => {
  it('GET - Should return 200 Server Health is OK', async () => {
    const res = await request.get('/status')
    expect(res.statusCode).toEqual(200)
  }),
  it('HEAD - Should return 200 Server Health is OK', async () => {
    const res = await request.head('/status')
    expect(res.statusCode).toEqual(200)
  })
})