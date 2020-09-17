// /// <reference types="cypress" />
// describe('Test scenario runner page', () => {
//   let userEmail = 'lightbot_cypress@testing.web'
//   let userPass = 'Cypress301#'

//   context('Actions', () => {
//     before(() => {
//       cy.visit('/')
//       cy.server()
//       cy.route({
//         method: 'POST',
//         url: '/user/login',
//       }).as('apiLogin')
//       cy.get('#idEmail')
//         .clear()
//         .type(userEmail)
//         .get('#idPassword')
//         .clear()
//         .type(userPass)
//         .get('.btn-round')
//         .contains('Login')
//         .click()
//       cy.wait('@apiLogin')
//       cy.server()
//       cy.route({
//         method: 'GET',
//         url: '/user/me',
//       }).as('apiMe')
//     })

//     //Check if page loads successfully
//     it('successfully load Scenario runner page', () => {
//       cy.visit('/home/scenario')
//       //Check if sidebar loads
//       cy.get('.sidebar').should('be.visible')
//       //Check if footer loads
//       cy.get('.footer').should('exist')
//       //Check if navbar loads
//       cy.get('.navbar-collapse').should('be.visible')
//       //Check if title has correct text
//       cy.get('h2.title').contains('S').should('be.visible')
//     })
//   })
// })
