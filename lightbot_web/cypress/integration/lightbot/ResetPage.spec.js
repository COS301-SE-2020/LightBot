// /// <reference types="cypress" />
// describe('Test reset page', () => {
//   let userPassword = 'Password1!'
//   context('Actions', () => {
//     beforeEach(() => {
//       cy.visit('/reset')
//     })

//     //Check if page loads successfully
//     it('successfully loads', () => {
//       cy.visit('/reset')
//       //Check if footer loads
//       cy.get('.footer').should('be.visible')
//     })

//     //Check if able to type data into password and confirm password fields
//     it('Type into password and confirm password  fields', () => {
//       // Test Email
//       cy.get('#idPassword')
//         .type(userPassword)
//         .should('have.value', userPassword)
//     })

//     //Check input validation for password and confirm password
//     it('Input validation for password and confirm password ', () => {
//       //Input validation for password
//       cy.get('#idPassword')
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
//         //Input validation for Confirm Password
//         .get('#idPassword2')
//         .clear()
//         .type('password')
//         .get('div.invalid-feedback')
//         .should('be.visible')
//         .get('#idPassword2')
//         .clear()
//         .type('Password1@')
//         .get('div.invalid-feedback')
//         .should('not.be.visible')
//         .get('#idPassword2')
//         .clear()
//         .get('div.invalid-feedback')
//         .should('be.visible')
//     })
//   })
// })
