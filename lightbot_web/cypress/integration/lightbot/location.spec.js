/// <reference types="cypress" />

context('Location', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('cy.hash() - get the current URL hash', () => {
    // https://on.cypress.io/hash
    cy.hash().should('be.empty')
  })

//   it('cy.location() - get window.location', () => {
//     // https://on.cypress.io/location
//     cy.location().should((location) => {
//       expect(location.hash).to.be.empty
//       expect(location.href).to.eq('https://www.lightbot.co.za/')
//       expect(location.host).to.eq('www.lightbot.co.za')
//       expect(location.hostname).to.eq('www.lightbot.co.za')
//       expect(location.origin).to.eq('https://www.lightbot.co.za')
//       expect(location.pathname).to.eq('/')
//       expect(location.port).to.eq('')
//       expect(location.protocol).to.eq('https:')
//       expect(location.search).to.be.empty
//     })
//   })

//   it('cy.url() - get the current URL', () => {
//     // https://on.cypress.io/url
//     cy.url().should('eq', 'https://www.lightbot.co.za/')
//   })
// })
