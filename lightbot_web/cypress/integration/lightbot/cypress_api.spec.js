/// <reference types="cypress" />

context('Cypress.arch', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Get CPU architecture name of underlying OS', () => {
    // https://on.cypress.io/arch
    expect(Cypress.arch).to.exist
  })
})

context('Cypress.config()', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Get and set configuration options', () => {
    // https://on.cypress.io/config
    let myConfig = Cypress.config()

    expect(myConfig).to.have.property('animationDistanceThreshold', 5)
    expect(myConfig).to.have.property('baseUrl', 'http://localhost:3000')
    expect(myConfig).to.have.property('defaultCommandTimeout', 4000)
    expect(myConfig).to.have.property('requestTimeout', 5000)
    expect(myConfig).to.have.property('responseTimeout', 30000)
    expect(myConfig).to.have.property('viewportHeight', 660)
    expect(myConfig).to.have.property('viewportWidth', 1000)
    expect(myConfig).to.have.property('pageLoadTimeout', 60000)
    expect(myConfig).to.have.property('waitForAnimations', true)

    expect(Cypress.config('pageLoadTimeout')).to.eq(60000)

    // this will change the config for the rest of your tests!
    Cypress.config('pageLoadTimeout', 20000)

    expect(Cypress.config('pageLoadTimeout')).to.eq(20000)

    Cypress.config('pageLoadTimeout', 60000)
  })
})
