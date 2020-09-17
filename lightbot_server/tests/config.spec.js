const app = require('express')()
const serverLoader = require('../src/loaders/express.loader')
require('../src/loaders/db.loader')()
serverLoader({ app: app })
const supertest = require('supertest')
const request = supertest(app)

jest.setTimeout(60000)
let auth

describe('Data Check', () => {
  it('POST - Should login user', async () => {
    const res = await request
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(
        '{"User_email": "lightbot_cypress@testingreg.web","User_password": "Password1!"}'
      )
    expect(res.statusCode).toEqual(200)
    expect(res.body.success.status).toEqual(200)
    expect(res.body.success.message).toEqual('User login successful.')
    auth = res.body.success.data.Auth_key
  })
  it('Get - Should run simulation', async () => {
    const res = await request.get('/config/run/10:10').set('Authorization','Bearer '+auth)
    expect(res.statusCode).toEqual(200)
    expect(res.body.success.status).toEqual(200)
    expect(res.body.success.message).toEqual('Successfully ran simulation.')
  })
  it('Get - Should push data to server', async () => {
    const res = await request.get('/data/push').set('Authorization','Bearer '+auth)
    expect(res.statusCode).toEqual(200)
    expect(res.body.success.status).toEqual(200)
    expect(res.body.success.message).toEqual('Successfully loaded data.')
  })
  it('Get - Should pull data from', async () => {
    const res = await request.get('/data/pull').set('Authorization','Bearer '+auth)
    expect(res.statusCode).toEqual(200)
    expect(res.body.success.status).toEqual(200)
    expect(res.body.success.message).toEqual('Data metrics loaded.')
  })
})
