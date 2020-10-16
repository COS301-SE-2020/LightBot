const app = require('express')()
const serverLoader = require('../src/loaders/express.loader')
require('../src/loaders/db.loader')()
serverLoader({ app: app })
const supertest = require('supertest')
const request = supertest(app)

jest.setTimeout(30000)
let auth

describe('Login Check', () => {
  it('POST - Should send recovery email', async () => {
    const res = await request
      .post('/user/recover-password')
      .set('Content-Type', 'application/json')
      .send(
        '{"User_email": "lightbot_cypress@testingreg.web"}'
      )
    expect(res.statusCode).toEqual(200)
    expect(res.body.success.status).toEqual(200)
    expect(res.body.success.message).toEqual('If an account associated with this address exists, an email will be sent to it.')
  })
  it('POST - Should report incorrect fields', async () => {
    const res = await request
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(
        '{"User_emil": "lightbot_cypress@testingreg.web","User_password": "Password1!"}'
      )
    expect(res.statusCode).toEqual(400)
    expect(res.body.error.status).toEqual(400)
    expect(res.body.error.message).toEqual('Bad Request')
  })
  it('POST - Should report empty fields', async () => {
    const res = await request
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send('{"User_email": "","User_password": "Password1!"}')
    expect(res.statusCode).toEqual(400)
    expect(res.body.error.status).toEqual(400)
    expect(res.body.error.message).toEqual('Bad Request')
  })
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
  it('Get - Should return unauthorized', async () => {
    const res = await request.get('/user/me')
    expect(res.statusCode).toEqual(401)
    expect(res.body.error.status).toEqual(401)
    expect(res.body.error.message).toEqual('Authentication failed.')
  })
  it('Get - Should return user profile', async () => {
    const res = await request.get('/user/me').set('Authorization','Bearer '+auth)
    expect(res.statusCode).toEqual(200)
    expect(res.body.success.status).toEqual(200)
    expect(res.body.success.message).toEqual('Succesfully retrieved user profile.')
  })
})
