/// <reference types="cypress" />
describe('Test register page', () => {
  let userEmailRegister = 'lightbot_cypress@testingb.web'
  let userPass = 'Cypress301#'
  context('Actions', () => {
    beforeEach(() => {
      cy.visit('/register')
    })

    //Check if page loads successfully
    it('successfully loads', () => {
      cy.visit('/register')
      //Check if footer loads
      cy.get('.footer').should('be.visible')
    })

    //Check if link to login page works
    it('Test link to login page', () => {
      cy.get('div.pull-left > h6 > .link')
        .click()
        .then(() => {
          cy.url().should('contain', Cypress.config().baseUrl + '/login')
        })
    })

    //Check if link to recovery page works
    it('Test link to recovery page', () => {
      cy.get('div.pull-right > h6 > .link')
        .click()
        .then(() => {
          cy.url().should('contain', Cypress.config().baseUrl + '/recovery')
        })
    })

    //Check if able to type data into all fields
    it('Type into allfields', () => {
      // Test name field
      cy.get('#idName')
        .clear()
        .type('Cypress')
        .should('have.value', 'Cypress')
        //Test surname field
        .get('#idSurname')
        .clear()
        .type('Test')
        .should('have.value', 'Test')
        //Test email field
        .get('#idEmail')
        .clear()
        .type('fake@email.com')
        .should('have.value', 'fake@email.com')
        //Test password field1
        .get('#idPassword')
        .type('Password1@')
        .should('have.value', 'Password1@')
        //Test password field2
        .get('#idPassword2')
        .type('Password1@')
        .should('have.value', 'Password1@')
    })

    //Check input validation for all fields
    it('Input validation for all fields', () => {
      //Input validation for Name
      cy.get('#idName')
        .clear()
        .type('Ab')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('#idName')
        .clear()
        .type('123')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('#idName')
        .clear()
        .type('Ab32')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('#idName')
        .clear()
        .type('Test')
        .get('div.invalid-feedback')
        .should('not.be.visible')
        //Input validation for Surname
        .get('#idSurname')
        .clear()
        .type('Ab')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('#idSurname')
        .clear()
        .type('123')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('#idSurname')
        .clear()
        .type('Ab32')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('#idSurname')
        .clear()
        .type('Test')
        .get('div.invalid-feedback')
        .should('not.be.visible')
        //Input validation for Email
        .get('#idEmail')
        .clear()
        .type('fake@email')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('#idEmail')
        .clear()
        .type('fake@email.com')
        .get('div.invalid-feedback')
        .should('not.be.visible')
        //Input validation for Password
        .get('#idPassword')
        .clear()
        .type('password')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('#idPassword')
        .clear()
        .type('password1')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('#idPassword')
        .clear()
        .type('password@')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('#idPassword')
        .clear()
        .type('Password1@')
        .get('div.invalid-feedback')
        .should('not.be.visible')
        //Input validation for Confirm Password
        .get('#idPassword2')
        .clear()
        .type('password')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('#idPassword2')
        .clear()
        .type('Password1@')
        .get('div.invalid-feedback')
        .should('not.be.visible')
        .get('#idPassword2')
        .clear()
        .get('div.invalid-feedback')
        .should('be.visible')
    })

    //Test valid register request and check that user is redirected to login page
    it('Test valid reigster request', () => {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/user/register',
      }).as('apiCheck')
      cy.get('#idName')
        .clear()
        .type('Name')
        .get('#idSurname')
        .clear()
        .type('Surname')
        .get('#idEmail')
        .clear()
        .type(userEmailRegister)
        .get('#idPassword')
        .clear()
        .type(userPass)
        .get('#idPassword2')
        .clear()
        .type(userPass)
        .get('.btn-round')
        .contains('Register')
        .click()
      cy.wait('@apiCheck')
        .then((xhr) => {
          assert.equal(xhr.status, '200')
        })
        //Check if redirected to login page
        .then(() => {
          cy.url().should('contain', Cypress.config().baseUrl + '/login')
        })
      //Check new user can be logged in
      cy.request('GET', '/user/login', {
        User_email: 'lightbot_cypress@testingb.web',
        User_password: 'Cypress301#',
      }).then((xhr) => {
        assert.equal(xhr.status, '200')
      })
    })

    //Test register functionality with existing email
    it('Test register with existing email', () => {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/user/register',
      }).as('apiCheck')
      cy.get('#idName')
        .clear()
        .type('Name')
        .get('#idSurname')
        .clear()
        .type('Surname')
        .get('#idEmail')
        .clear()
        .type(userEmailRegister)
        .get('#idPassword')
        .clear()
        .type('Password1@')
        .get('#idPassword2')
        .clear()
        .type('Password1@')
        .get('.btn-round')
        .contains('Register')
        .click()
      cy.wait('@apiCheck').then((xhr) => {
        assert.equal(
          xhr.response.body.error.message,
          'User already exists please sign in.'
        )
      })
    })
  })
})
