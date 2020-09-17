// /// <reference types="cypress" />
// describe('Test navbar component', () => {
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
//     it('successfully loads', () => {
//       cy.visit('/home/overview')
//       //Check if nav-bar loads
//       cy.get('.navbar-collapse').should('be.visible')
//     })

//     it('Test navbar and routing to forum', () => {
//       //Check routing to Profile
//       cy.get('a i.media-2_sound-wave')
//         .click()
//         .then(() => {
//           cy.url().should('contain', Cypress.config().baseUrl + '/home/forum')
//         })
//       cy.get('a')
//         .contains('Notification Forum')
//         .parent()
//         .should('have.class', 'active')
//     })

//     it('Test navbar and routing to profile', () => {
//       //Check routing to Profile
//       cy.get('a i.users_single-02')
//         .click()
//         .then(() => {
//           cy.url().should('contain', Cypress.config().baseUrl + '/home/profile')
//         })
//       cy.get('a').contains('Profile').parent().should('have.class', 'active')
//     })

//     //Test navbar routing to Logout and click no on logout popup
//     it('Test navbar and routing to logout and cancel of logout', () => {
//       cy.get('ul.navbar-nav > li a i.objects_spaceship')
//         .click()
//         .then(() => {
//           cy.get('div.modal-content').should('be.visible')
//           cy.get('button')
//             .contains('No')
//             .click()
//             .then(() => {
//               cy.get('div.modal-content').should('not.be.visible')
//             })
//         })
//     })
//     //Test Logout and Yes
//     it('Test logout', () => {
//       cy.get('ul.navbar-nav > li a i.objects_spaceship')
//         .click()
//         .then(() => {
//           cy.get('button')
//             .contains('Yes')
//             .click()
//             .then(() => {
//               cy.url().should('contain', Cypress.config().baseUrl)
//             })
//         })
//     })
//   })
// })
