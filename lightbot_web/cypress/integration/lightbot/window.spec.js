/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Get the global window object', () => {
    cy.window().should('have.property', 'top')
  })

  it('Get the document object', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
  })

  it('Get the title', () => {
    cy.title().should('equal', 'LightBot')
  })

  it('Test rerouting to login page for invalid url', () => {
    //Test rerouting to login page for invalid url
    cy.visit('/asdfasdfasdfas').then(() => {
      cy.url().should('contain', Cypress.config().baseUrl + '/login')
    })
  })
})

it('Make sure home and subsequent pages are not able to be visited without logging in', () => {
  //Test unauthorized access to overview page
  cy.visit('/home/overview').then(() => {
    cy.url().should('contain', Cypress.config().baseUrl + '/login')
  })
  //Test unauthorized access to profile page
  cy.visit('/home/profile').then(() => {
    cy.url().should('contain', Cypress.config().baseUrl + '/login')
  })
  //Test unauthorized access to users page
  cy.visit('/home/users').then(() => {
    cy.url().should('contain', Cypress.config().baseUrl + '/login')
  })
  //Test unauthorized access to forum page
  cy.visit('/home/forum').then(() => {
    cy.url().should('contain', Cypress.config().baseUrl + '/login')
  })
  // //Test unauthorized access to simulation page
  // cy.visit('/home/simulation').then(() => {
  //   cy.url().should('contain', Cypress.config().baseUrl + '/login')
  // })
  //Test unauthorized access to configuaration page
  cy.visit('/home/configuration').then(() => {
    cy.url().should('contain', Cypress.config().baseUrl + '/login')
  })
})
