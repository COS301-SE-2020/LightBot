const app = require('express')()
const serverLoader = require('../src/loaders/express.loader')
require('../src/loaders/db.loader')()
serverLoader({ app: app })
const supertest = require('supertest')
const request = supertest(app)

jest.setTimeout(30000)
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
  it('Get - Should return user profile', async () => {
    const res = await request.get('/data/list-user').set('Authorization','Bearer '+auth)
    expect(res.statusCode).toEqual(200)
    expect(res.body.success.status).toEqual(200)
    expect(res.body.success.message).toEqual('Successfully acquired user list.')
  })
  it('Get - Should return forum data', async () => {
    const res = await request.get('/data/forum').set('Authorization','Bearer '+auth)
    expect(res.statusCode).toEqual(200)
    expect(res.body.success.status).toEqual(200)
    expect(res.body.success.message).toEqual('Successfully obtained forum posts.')
  })
  it('Get - Should elevate', async () => {
    const res = await request.get('/data/state').set('Authorization','Bearer '+auth)
    expect(res.statusCode).toEqual(200)
    expect(res.body.success.status).toEqual(200)
    expect(res.body.success.message).toEqual('Successfully acquired state data.')
  })
})
