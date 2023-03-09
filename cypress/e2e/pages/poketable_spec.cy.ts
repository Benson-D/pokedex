/// <reference types="cypress" />

describe('PokeTable Page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://beta.pokeapi.co/graphql/v1beta', (req) => {
      if (req.body.operationName === 'pokeAPIquery') {
          req.alias = 'pokeAPIquery'
      }
    })
    cy.visit('/')
  })
  
  it('renders the table with initial data and columns', () => {
    // Wait for PokeAPI query to complete
    cy.wait('@pokeAPIquery')

    // Check that the columns are rendered correctly.
    cy.get('.poke-table-header th').should('have.length', 6)
    cy.get('.poke-table-header th')
      .eq(1)
      .should('have.text', 'NAME')

    // Check that the initial data is rendered correctly.
    cy.get('.poke-table-body tr').should('have.length', 15);
    cy.get('.poke-table-body .poke-link a')
      .eq(0)
      .should('have.text', 'bulbasaur')
  })

  it('should navigate to Battle/Table pages', () => {
    // Wait for PokeAPI query to complete
    cy.wait('@pokeAPIquery')

    // Click on Battle button and verify URL
    cy.get('[data-cy-nav-desktop="battle"]').click()
    cy.url().should('include', '/battle')

    // Click on Table button and verify URL
    cy.get('[data-cy-nav-desktop="table"]').click()
    cy.url().should('include', '/')
  })

  it('initiates dark mode on click and stores in local storage', () => {
    // Wait for PokeAPI query to complete
    cy.wait('@pokeAPIquery')

    // Click on Dark Mode button and verify background color change
    cy.get('[data-cy-nav-desktop="dark-mode"]').click()
    cy.get('body')
      .should('have.css', 'background-color', 'rgb(30, 41, 59)')

    // Reload the current page, verify local storage
    cy.reload()
    cy.wait('@pokeAPIquery')
    cy.get('body')
      .should('have.css', 'background-color', 'rgb(30, 41, 59)')
  })

  it('filter popups appear after click', () => {
    // Popups are not displayed
    cy.get('[data-cy-list="poke-popup-list"]').should('not.be.visible')

    // Table length filter appears after click
    cy.get('[data-cy-popup="poke-popup"]').eq(0).click()
    cy.get('[data-cy-list="poke-popup-list"] li')
      .eq(0)
      .should('have.text', 'Show 15')
  })

})
