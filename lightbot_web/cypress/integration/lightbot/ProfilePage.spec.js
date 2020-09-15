/// <reference types="cypress" />
describe('Test profile page', () => {
  let userEmail = 'lightbot_cypress@testing.web'
  let userPass = 'Cypress301#'

  context('Actions', () => {
    before(() => {
      cy.visit('/')
      cy.server()
      cy.route({
        method: 'POST',
        url: '/user/login',
      }).as('apiLogin')
      cy.get('#idEmail')
        .clear()
        .type(userEmail)
        .get('#idPassword')
        .clear()
        .type(userPass)
        .get('.btn-round')
        .contains('Login')
        .click()
      cy.wait('@apiLogin')
      cy.server()
      cy.route({
        method: 'GET',
        url: '/user/me',
      }).as('apiMe')
    })

    //Check if page loads successfully
    it('successfully loads', () => {
      cy.visit('/home/profile')
      //Check if sidebar loads
      cy.get('.sidebar').should('be.visible')
      cy.get('.footer').should('exist')
      cy.get('.navbar-collapse').should('be.visible')
      cy.get('h2.title').contains('Profile').should('be.visible')
    })
  })
})
