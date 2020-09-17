/// <reference types="cypress" />

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

  it('Check navigational elements for various viewport', () => {
    //default viewport
    cy.get('.navbar-collapse').should('be.visible')
    cy.get('.sidebar').should('be.visible')
    cy.get('.navbar-toggler').should('not.be.visible')
    cy.get('.navbar-toggle').should('not.be.visible')

    // Navigational elements on very large screen
    cy.viewport(2999, 2999)
    cy.get('.navbar-collapse').should('be.visible')
    cy.get('.sidebar').should('be.visible')
    cy.get('.navbar-toggler').should('not.be.visible')
    cy.get('.navbar-toggle').should('not.be.visible')

    // Navigational elements on a variety of common devices viewports

    cy.viewport('macbook-15')
    cy.get('.navbar-collapse').should('be.visible')
    cy.get('.sidebar').should('be.visible')
    cy.get('.navbar-toggler').should('not.be.visible')
    cy.get('.navbar-toggle').should('not.be.visible')

    cy.viewport('macbook-13')
    cy.get('.navbar-collapse').should('be.visible')
    cy.get('.sidebar').should('be.visible')
    cy.get('.navbar-toggler').should('not.be.visible')
    cy.get('.navbar-toggle').should('not.be.visible')

    cy.viewport('macbook-11')
    cy.get('.navbar-collapse').should('be.visible')
    cy.get('.sidebar').should('be.visible')
    cy.get('.navbar-toggler').should('not.be.visible')
    cy.get('.navbar-toggle').should('not.be.visible')

    cy.viewport('ipad-2')
    cy.get('.navbar-collapse').should('not.be.visible')
    cy.get('.sidebar').should('not.be.visible')
    cy.get('.navbar-toggler').should('be.visible')
    cy.get('.navbar-toggle').should('be.visible')

    cy.viewport('ipad-mini')
    cy.get('.navbar-collapse').should('not.be.visible')
    cy.get('.sidebar').should('not.be.visible')
    cy.get('.navbar-toggler').should('be.visible')
    cy.get('.navbar-toggle').should('be.visible')

    cy.viewport('iphone-6+')
    cy.get('.navbar-collapse').should('not.be.visible')
    cy.get('.sidebar').should('not.be.visible')
    cy.get('.navbar-toggler').should('be.visible')
    cy.get('.navbar-toggle').should('be.visible')

    cy.viewport('iphone-6')
    cy.get('.navbar-collapse').should('not.be.visible')
    cy.get('.sidebar').should('not.be.visible')
    cy.get('.navbar-toggler').should('be.visible')
    cy.get('.navbar-toggle').should('be.visible')

    cy.viewport('samsung-s10')
    cy.get('.navbar-collapse').should('not.be.visible')
    cy.get('.sidebar').should('not.be.visible')
    cy.get('.navbar-toggler').should('be.visible')
    cy.get('.navbar-toggle').should('be.visible')

    cy.viewport('iphone-x')
    cy.get('.navbar-collapse').should('not.be.visible')
    cy.get('.sidebar').should('not.be.visible')
    cy.get('.navbar-toggler').should('be.visible')
    cy.get('.navbar-toggle').should('be.visible')
  })
})
