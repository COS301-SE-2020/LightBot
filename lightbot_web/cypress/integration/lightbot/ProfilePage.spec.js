/// <reference types="cypress" />
describe('Test profile page', () => {
  let userEmail = 'lightbot_cypress@testing.web'
  let userPass = 'Cypress301#'

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
      cy.get('a').contains('Profile').click()
    })

    //Check if page loads successfully
    it('successfully loads', () => {
      //Check if sidebar loads
      cy.get('.sidebar').should('be.visible')
      cy.get('.footer').should('exist')
      cy.get('.navbar-collapse').should('be.visible')
      cy.get('h2.title').contains('Profile').should('be.visible')
    })

    //Check if profile information card loads
    it('Check profile card summary', () => {
      cy.get('div.author').contains('Testing')
      cy.get('div.author').contains('Lightbot')
      cy.get('div.author').contains('Administrator')
    })

    //Check if profile picture update  card loads
    it('Check profile image update card', () => {
      cy.get('div.card-body').contains('Click here to select profile image')
      cy.get('div.card-body').contains('button', 'Submit')
    })

    //Check if profile information contains correct information and initially locked
    it('Check profile details card', () => {
      cy.get('[placeholder=Name]')
        .should('have.value', 'Testing')
        .and('be.disabled')
      cy.get('[placeholder=Surname]')
        .should('have.value', 'Lightbot')
        .and('be.disabled')
      cy.get('[placeholder=Email]')
        .should('have.value', 'lightbot_cypress@testing.web')
        .and('be.disabled')
      cy.get('[placeholder=Role]')
        .should('have.value', 'Administrator')
        .and('be.disabled')
      cy.get('[placeholder=State]').should('have.value', '1').and('be.disabled')
    })

    //Check if password card loads
    it('Check password change card', () => {
      cy.get('[name=oldpassword]').should('exist')
      cy.get('[name=User_password]').and('exist')
      cy.get('[name=cnewpassword]').should('exist')
    })

    //Check if profile information can be unlocked with switch
    it('Check if input group disable switch works', () => {
      cy.get('.custom-control').click()
      cy.get('[placeholder=Name]')
        .should('have.value', 'Testing')
        .and('not.be.disabled')
      cy.get('[placeholder=Surname]')
        .should('have.value', 'Lightbot')
        .and('not.be.disabled')
      cy.get('[placeholder=Email]')
        .should('have.value', 'lightbot_cypress@testing.web')
        .and('be.disabled')
      cy.get('[placeholder=Role]')
        .should('have.value', 'Administrator')
        .and('be.disabled')
      cy.get('[placeholder=State]').should('have.value', '1').and('be.disabled')
    })
    //Check if profile information inputs can be typed into
    it('Check profile details inputs', () => {
      cy.get('.custom-control').click()
      cy.get('[placeholder=Name]')
        .clear()
        .type('fakeName')
        .should('have.value', 'fakeName')
      cy.get('[placeholder=Surname]')
        .clear()
        .type('fakeSurname')
        .should('have.value', 'fakeSurname')
      cy.get('.custom-control').click()
    })

    //Check if profile information can be changed with switch
    it('Check if values are saved when submitted', () => {
      cy.get('.custom-control').click()
      cy.get('[placeholder=Name]').clear().type('Testing')
      cy.get('[placeholder=Surname]').clear().type('Lightbot')
      cy.get('.custom-control').click()
    })

    it('Check if password card can be', () => {
      cy.get('[name=oldpassword]')
        .clear()
        .type('password')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('[name=oldpassword]')
        .clear()
        .type('password1')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('[name=oldpassword]')
        .clear()
        .type('password@')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('[name=oldpassword]')
        .clear()
        .type('Password1@')
        .get('div.invalid-feedback')
        .should('not.be.visible')
      cy.get('[name=User_password]')
        .clear()
        .type('password')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('[name=User_password]')
        .clear()
        .type('password1')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('[name=User_password]')
        .clear()
        .type('password@')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('[name=User_password]')
        .clear()
        .type('Password1@')
        .get('div.invalid-feedback')
        .should('not.be.visible')
      cy.get('[name=cnewpassword]')
        .clear()
        .type('password')
        .get('div.invalid-feedback')
        .should('be.visible')
        .get('[name=cnewpassword]')
        .clear()
        .type('Password1@')
        .get('div.invalid-feedback')
        .should('not.be.visible')
        .get('[name=cnewpassword]')
        .clear()
        .get('div.invalid-feedback')
        .should('be.visible')
    })
  })
})
