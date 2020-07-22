const request = require('supertest')
const app = require('../server')

describe('User Endpoints test', () => {
  beforeAll(done => {
    done()
  })
    test('should respond to invalid route', async done => {
      request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
    })
    test('should respond to registration', async done => {
      request(app)
      .post("/register")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
    })
    test('should respond to login', async done => {
      request(app)
      .post("/login")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
    })
    test('should respond to logout', async done => {
      request(app)
      .get("/logout")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
    })
    test('should respond to update-password', async done => {
      request(app)
      .put("/update-password")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
    })
    test('should respond to recover-password', async done => {
      request(app)
      .post("/recover-password")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
    })
    test('should respond to reset-password', async done => {
      request(app)
      .get("/reset-password/:passresetid")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
    })
    test('should respond to delete', async done => {
      request(app)
      .get("/delete")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
    })
    test('should respond to list-user', async done => {
      request(app)
      .get("/list-user")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
    })
    afterAll(done => {
      app.close()
      done()
    })
  })

  describe('Data Endpoints test', () => {
    beforeAll(done => {
      done()
    })
    test('should respond to login', async done => {
      request(app)
      .get("/graph")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
    })
    test('should respond to login', async done => {
      request(app)
      .get("/forum")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
    })
    test('should respond to login', async done => {
      request(app)
      .get("/notification")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
    })
    test('should respond to login', async done => {
      request(app)
      .get("/state")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
    })
      test('should respond to login', async done => {
        request(app)
        .post("/post-forum")
        .then(response => {
          expect(response.statusCode).toBe(404);
          done();
        });
      })
      test('should respond to login', async done => {
        request(app)
        .patch("/post-forum/:forumpostid")
        .then(response => {
          expect(response.statusCode).toBe(404);
          done();
        });
      })
      test('should respond to login', async done => {
        request(app)
        .delete("/delete-forum/:forumpostid")
        .then(response => {
          expect(response.statusCode).toBe(404);
          done();
        });
      })
      afterAll(done => {
        // Closing the DB connection allows Jest to exit successfully.
        app.close()
        done()
      })
    })