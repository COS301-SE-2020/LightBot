/// <reference types="cypress" />
describe('Test sidebar component and routing for regular user', () => {
  let userEmail = 'lightbot_cypress@testingreg.web'
  let userPass = 'Password1!'

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
    it('successfully loads', () => {
      //Check if sidebar loads
      cy.get('.sidebar').should('be.visible')
    })

    it('Test sidebar and routing to profile', () => {
      //Check routing to Profile
      cy.get('a')
        .contains('Profile')
        .click()
        .then(() => {
          cy.url().should('contain', Cypress.config().baseUrl + '/home/profile')
        })
      cy.get('a').contains('Profile').parent().should('have.class', 'active')
    })
    //Test routing to Overview
    it('Test sidebar and routing to overview', () => {
      cy.get('a')
        .contains('Overview')
        .click()
        .then(() => {
          cy.url().should(
            'contain',
            Cypress.config().baseUrl + '/home/overview'
          )
        })
      cy.get('a').contains('Overview').parent().should('have.class', 'active')
    })
    //Test routing to forum
    it('Test sidebar and routing to forum', () => {
      cy.get('a').contains('Notification Forum').should('not.be.visible')
    })
    //Test routing to simulation
    it('Test sidebar and routing to simulation', () => {
      cy.get('a')
        .contains('Visualizer')
        .click()
        .then(() => {
          cy.url().should(
            'contain',
            Cypress.config().baseUrl + '/home/Visualizer'
          )
        })
      cy.get('a').contains('Visualizer').parent().should('have.class', 'active')
    })
    //Test routing to users
    it('Test sidebar and routing to users', () => {
      cy.get('a').contains('Users').should('not.be.visible')
    })
    //Test routing to Configuration
    it('Test sidebar and routing to configuration', () => {
      cy.get('a').contains('Scenario Runner').should('not.be.visible')
    })
    // //Test routing to Logout and click no on logout popup
    // it('Test sidebar and routing to logout and cancel of logout', () => {
    //   cy.get('a').contains('"Logout"').parent().should('have.class', 'active')
    //   cy.get('a')
    //     .contains('"Logout"')
    //     .click()
    //     .then(() => {
    //       cy.get('div.modal-content').should('be.visible')
    //       cy.get('button')
    //         .contains('No')
    //         .click()
    //         .then(() => {
    //           cy.get('div.modal-content').should('not.be.visible')
    //         })
    //     })
    // })
    // //Test Logout and Yes
    // it('Test logout', () => {
    //   cy.get('a')
    //     .contains('"Logout"')
    //     .click()
    //     .then(() => {
    //       cy.get('button')
    //         .contains('Yes')
    //         .click()
    //         .then(() => {
    //           cy.url().should('contain', Cypress.config().baseUrl)
    //         })
    //     })
    // })
  })
})
