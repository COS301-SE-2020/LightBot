/// <reference types="cypress" />
describe('Unit Test our login page', () => {
  let userEmail = 'lightbot_cypress@testing.web'
  let userEmailRegister = 'lightbot_cypress@testingb.web'
  let userPass = 'Cypress301#'
  context('Actions', () => {
    beforeEach(() => {
      cy.visit('/register')
    })

    //Check if page loads successfully
    it('successfully loads', () => {
      cy.visit('/register') // change URL to match your dev URL
    })

    // //Check if link to login page works
    // it('Test link to login page', () => {
    //   cy.get('div.pull-left > h6 > .link')
    //     .click()
    //     .then(() => {
    //       cy.url().should('contain', Cypress.config().baseUrl + '/login')
    //     })
    // })

    // //Check if link to recovery page works
    // it('Test link to recovery page', () => {
    //   cy.get('div.pull-right > h6 > .link')
    //     .click()
    //     .then(() => {
    //       cy.url().should('contain', Cypress.config().baseUrl + '/recovery')
    //     })
    // })

    // //Check if able to type data into all fields
    // it('Type into allfields', () => {
    //   // Test Email
    //   cy.get('#idName')
    //     .clear()
    //     .type('Cypress')
    //     .should('have.value', 'Cypress')
    //     .get('#idSurname')
    //     .clear()
    //     .type('Test')
    //     .should('have.value', 'Test')
    //     .get('#idEmail')
    //     .clear()
    //     .type('fake@email.com')
    //     .should('have.value', 'fake@email.com')
    //     //Test password field1
    //     .get('#idPassword')
    //     .type('Password1@')
    //     .should('have.value', 'Password1@')
    //     //Test password field2
    //     .get('#idPassword2')
    //     .type('Password1@')
    //     .should('have.value', 'Password1@')
    // })

    // //Check input validation for all fields
    // it('Input validation for all fields', () => {
    //   //Input validation for Name
    //   cy.get('#idName')
    //     .clear()
    //     .type('Ab')
    //     .get('div.invalid-feedback')
    //     .should('be.visible')
    //     .get('#idName')
    //     .clear()
    //     .type('123')
    //     .get('div.invalid-feedback')
    //     .should('be.visible')
    //     .get('#idName')
    //     .clear()
    //     .type('Ab32')
    //     .get('div.invalid-feedback')
    //     .should('be.visible')
    //     .get('#idName')
    //     .clear()
    //     .type('Test')
    //     .get('div.invalid-feedback')
    //     .should('not.be.visible')
    //     //Input validation for Surname
    //     .get('#idSurname')
    //     .clear()
    //     .type('Ab')
    //     .get('div.invalid-feedback')
    //     .should('be.visible')
    //     .get('#idSurname')
    //     .clear()
    //     .type('123')
    //     .get('div.invalid-feedback')
    //     .should('be.visible')
    //     .get('#idSurname')
    //     .clear()
    //     .type('Ab32')
    //     .get('div.invalid-feedback')
    //     .should('be.visible')
    //     .get('#idSurname')
    //     .clear()
    //     .type('Test')
    //     .get('div.invalid-feedback')
    //     .should('not.be.visible')
    //     //Input validation for Email
    //     .get('#idEmail')
    //     .clear()
    //     .type('fake@email')
    //     .get('div.invalid-feedback')
    //     .should('be.visible')
    //     .get('#idEmail')
    //     .clear()
    //     .type('fake@email.com')
    //     .get('div.invalid-feedback')
    //     .should('not.be.visible')
    //     //Input validation for password1
    //     .get('#idPassword')
    //     .clear()
    //     .type('password')
    //     .get('div.invalid-feedback')
    //     .should('be.visible')
    //     .get('#idPassword')
    //     .clear()
    //     .type('password1')
    //     .get('div.invalid-feedback')
    //     .should('be.visible')
    //     .get('#idPassword')
    //     .clear()
    //     .type('password@')
    //     .get('div.invalid-feedback')
    //     .should('be.visible')
    //     .get('#idPassword')
    //     .clear()
    //     .type('Password1@')
    //     .get('div.invalid-feedback')
    //     .should('not.be.visible')
    //     //Input validation for password2
    //     .get('#idPassword2')
    //     .clear()
    //     .type('password')
    //     .get('div.invalid-feedback')
    //     .should('be.visible')
    //     .get('#idPassword2')
    //     .clear()
    //     .type('Password1@')
    //     .get('div.invalid-feedback')
    //     .should('not.be.visible')
    //     .get('#idPassword2')
    //     .clear()
    //     .get('div.invalid-feedback')
    //     .should('be.visible')
    // })

    // //Test register functionality with existing email
    // it('Test incorrect email request', () => {
    //   cy.server()
    //   cy.route({
    //     method: 'POST',
    //     url: '/user/register',
    //   }).as('apiCheck')
    //   cy.get('#idName')
    //     .clear()
    //     .type('Name')
    //     .get('#idSurname')
    //     .clear()
    //     .type('Surname')
    //     .get('#idEmail')
    //     .clear()
    //     .type(userEmail)
    //     .get('#idPassword')
    //     .clear()
    //     .type('Password1@')
    //     .get('#idPassword2')
    //     .clear()
    //     .type('Password1@')
    //     .get('.btn-round')
    //     .contains('Register')
    //     .click()
    //   cy.wait('@apiCheck').then((xhr) => {
    //     assert.equal(
    //       xhr.response.body.error.message,
    //       'User already exists please sign in.'
    //     )
    //   })
    // })

    //Test valid register request and check that user is redirected to login page
    it('Test valid login request', () => {
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
      cy.wait('@apiCheck').then((xhr) => {
        assert.equal(
          xhr.response.body.error.message,
          'User already exists please sign in.'
        )
        cy.url().should('contain', Cypress.config().baseUrl)
      })
    })

    // //Test if cookie works
    // it('Test to see if valid login loads Cookie, and tests functionality of Cookie', () => {
    //   cy.server()
    //   cy.route({
    //     method: 'POST',
    //     url: '/user/login',
    //   }).as('apiLogin')
    //   cy.get('#idEmail')
    //     .clear()
    //     .type(userEmail)
    //     .get('#idPassword')
    //     .clear()
    //     .type(userPass)
    //     .get('.btn-round')
    //     .contains('Login')
    //     .click()
    //   cy.wait('@apiLogin').then(() => {
    //     //Check if cookie exits
    //     cy.getCookie('token').should('exist')
    //   })
    //   //Check if cookie works
    //   cy.server()
    //   cy.route({
    //     method: 'GET',
    //     url: '/user/me',
    //   }).as('apiMe')
    //   cy.visit('/')
    //   //If token exits and visit login page should be redirected to overview page
    //   cy.wait('@apiMe')
    //     .then((xhr) => {
    //       //Check to see if correct profile loaded
    //       assert.equal(xhr.response.body.success.data.User_email, userEmail)
    //     })
    //     .then(() => {
    //       cy.url().should(
    //         'contain',
    //         Cypress.config().baseUrl + '/home/overview'
    //       )
    //     })
    // })
  })
})
