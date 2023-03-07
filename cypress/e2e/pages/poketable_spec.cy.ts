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

})
