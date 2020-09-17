/// <reference types="cypress" />
describe('Test recovery page', () => {
  let userEmail = 'lightbot_cypress@testing.web'
  let userPass = 'Cypress301#'
  context('Actions', () => {
    beforeEach(() => {
      cy.visit('/recovery')
    })

    //Check if page loads successfully
    it('successfully loads', () => {
      cy.visit('/recovery')
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

    //Check if link to register page works
    it('Test link to register page', () => {
      cy.get('div.pull-right > h6 > .link')
        .click()
        .then(() => {
          cy.url().should('contain', Cypress.config().baseUrl + '/register')
        })
    })

    //Check if able to type data into email fields
    it('Type into email fields', () => {
      // Test Email
      cy.get('#idEmail')
        .type('fake@email.com')
        .should('have.value', 'fake@email.com')
    })

    //Check input validation for email
    it('Input validation for email', () => {
      //Input validation for email
      cy.get('#idEmail')
        .clear()
        .type('fake@email')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('#idEmail')
        .clear()
        .type('fake@email.com')
        .get('div.invalid-feedback')
        .should('not.be.visible')
    })

    //Test login functionality with non existing email
    it('Test incorrect email request', () => {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/user/recover-password',
      }).as('apiCheck')
      //Test incorrect email
      cy.get('#idEmail')
        .clear()
        .type('lightbotfakeexitnot@testing.web')
        .get('.btn-round')
        .contains('Submit')
        .click()
      cy.wait('@apiCheck').then((xhr) => {
        assert.equal(xhr.response.body.error.message, 'User does not exist.')
      })
    })

    //Test valid password recovery request
    it('Test valid password recovery request', () => {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/user/recover-password',
      }).as('apiCheck')
      cy.get('#idEmail')
        .clear()
        .type(userEmail)
        .get('.btn-round')
        .contains('Submit')
        .click()
      // cy.wait('@apiCheck').then((xhr) => {
      //   //Check API Response
      //   //assert.equal(xhr.status, '200')
      // })
    })
  })
})
