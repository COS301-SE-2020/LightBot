/// <reference types="cypress" />
describe('Test overview page', () => {
  let userEmail = 'lightbot_cypress@testing.web'
  let userPass = 'Cypress301#'

  context('Actions', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.server()
      cy.route({
        method: 'POST',
        url: '/user/login',
      }).as('apiLogin')
      cy.route({
        method: 'GET',
        url: '/user/me',
      }).as('apiGet')
      cy.get('#idEmail')
        .clear()
        .type(userEmail)
        .get('#idPassword')
        .clear()
        .type(userPass)
        .get('.btn-round')
        .contains('Login')
        .click()
      cy.wait('@apiLogin').wait('@apiGet')
    })

    //Check if page loads successfully
    it('successfully load overview page', () => {
      cy.visit('/')
      //Check if sidebar loads
      cy.get('.sidebar').should('be.visible')
      //Check if footer loads
      cy.get('.footer').should('exist')
      //Check if navbar loads
      cy.get('.navbar-collapse').should('be.visible')
      //Check if title has correct text
      cy.get('h2.title').contains('Overview').should('be.visible')
    })
  })
})
