/// <reference types="cypress" />

describe('Test cookie/local storage', () => {
  let userEmail = 'lightbot_cypress@testing.web'
  let userPass = 'Cypress301#'

  //check if cookie is set
  it('Test to see if valid login sets Cookie', () => {
    //Check if cookie exits
    cy.visit('/')
    cy.clearCookies()
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
    cy.getCookie('token').should('exist')
  })

  //Check if cookie works
  it('Test to see if cookie works', () => {
    cy.visit('/')
    cy.clearCookies()
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
    cy.visit('/')
    //If token exits and visit login page should be redirected to overview page
    cy.wait('@apiMe')
      .then((xhr) => {
        //Check to see if correct profile loaded
        assert.equal(xhr.response.body.success.data.User_email, userEmail)
      })
      .then(() => {
        cy.url().should('contain', Cypress.config().baseUrl + '/home/overview')
      })
  })
})
