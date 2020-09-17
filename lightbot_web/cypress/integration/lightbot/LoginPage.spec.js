// /// <reference types="cypress" />
// describe('Test login page', () => {
//   let userEmail = 'lightbot_cypress@testing.web'
//   let userPass = 'Cypress301#'
//   context('Actions', () => {
//     beforeEach(() => {
//       cy.visit('/')
//     })

//     //Check if page loads successfully
//     it('successfully loads', () => {
//       cy.visit('/')
//       //Check if footer loads
//       cy.get('.footer').should('be.visible')
//     })

//     //Check if link to register page works
//     it('Test link to register page', () => {
//       cy.get('div.pull-left > h6 > .link')
//         .click()
//         .then(() => {
//           cy.url().should('contain', Cypress.config().baseUrl + '/register')
//         })
//     })

//     //Check if link to recovery page works
//     it('Test link to recovery page', () => {
//       cy.get('div.pull-right > h6 > .link')
//         .click()
//         .then(() => {
//           cy.url().should('contain', Cypress.config().baseUrl + '/recovery')
//         })
//     })

//     //Check if able to type data into email and password fields
//     it('Type into email and password fields', () => {
//       // Test Email
//       cy.get('#idEmail')
//         .type('fake@email.com')
//         .should('have.value', 'fake@email.com')
//         //Test Password field
//         .get('#idPassword')
//         .type('Password1@')
//         .should('have.value', 'Password1@')
//     })

//     //Check input validation for password and email
//     it('Input validation for password and email', () => {
//       //Input validation for email
//       cy.get('#idEmail')
//         .clear()
//         .type('fake@email')
//         .get('div.invalid-feedback')
//         .should('be.visible')
//         .get('#idEmail')
//         .clear()
//         .type('fake@email.com')
//         .get('div.invalid-feedback')
//         .should('not.be.visible')
//         //Input validation for password
//         .get('#idPassword')
//         .clear()
//         .type('password')
//         .get('div.invalid-feedback')
//         .should('be.visible')
//         .get('#idPassword')
//         .clear()
//         .type('password1')
//         .get('div.invalid-feedback')
//         .should('be.visible')
//         .get('#idPassword')
//         .clear()
//         .type('password@')
//         .get('div.invalid-feedback')
//         .should('be.visible')
//         .get('#idPassword')
//         .clear()
//         .type('Password1@')
//         .get('div.invalid-feedback')
//         .should('not.be.visible')
//     })

//     //Test login functionality with incorrect email
//     it('Test incorrect email request', () => {
//       cy.server()
//       cy.route({
//         method: 'POST',
//         url: '/user/login',
//       }).as('apiCheck')
//       //Test incorrect email
//       cy.get('#idEmail')
//         .clear()
//         .type('lightbot_cypressasdf@testing.web')
//         .get('#idPassword')
//         .clear()
//         .type(userPass)
//         .get('.btn-round')
//         .contains('Login')
//         .click()
//       cy.wait('@apiCheck').then((xhr) => {
//         assert.equal(
//           xhr.response.body.error.message,
//           'User does not exist, please sign up.'
//         )
//       })
//     })

//     //Test login functionality with incorrect password
//     it('Test incorrect password request', () => {
//       cy.server()
//       cy.route({
//         method: 'POST',
//         url: '/user/login',
//       }).as('apiCheck')
//       //Test incorrect password
//       cy.get('#idEmail')
//         .clear()
//         .type(userEmail)
//         .get('#idPassword')
//         .clear()
//         .type('Abc1234e!')
//         .get('.btn-round')
//         .contains('Login')
//         .click()
//       cy.wait('@apiCheck').then((xhr) => {
//         assert.equal(xhr.response.body.error.message, 'Invalid credentials.')
//       })
//     })

//     //Test valid login request and check that user is redirected to correct page
//     it('Test valid login request', () => {
//       cy.server()
//       cy.route({
//         method: 'POST',
//         url: '/user/login',
//       }).as('apiCheck')
//       cy.get('#idEmail')
//         .clear()
//         .type(userEmail)
//         .get('#idPassword')
//         .clear()
//         .type(userPass)
//         .get('.btn-round')
//         .contains('Login')
//         .click()
//       cy.wait('@apiCheck').then((xhr) => {
//         //Check API Response
//         assert.equal(xhr.status, '200')

//         //Check that correct page loads
//         cy.url().should('contain', Cypress.config().baseUrl + '/home/overview')
//       })
//     })
//   })
// })
