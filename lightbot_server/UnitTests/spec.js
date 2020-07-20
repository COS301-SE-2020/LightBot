var request = require('supertest');
require = require('really-need');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../server', { bustCache: true });
  });
  afterEach(function (done) {
    server.close(done);
  });
  it('responds to /login', function testLogin(done) {
    request(server)
      .post('/login')
      .expect(200, done);
  });
//   it('404 everything else', function testPath(done) {
//     console.log('test 404')
//     request(server)
//       .get('/foo/bar')
//       .expect(404, done);
//   });
});