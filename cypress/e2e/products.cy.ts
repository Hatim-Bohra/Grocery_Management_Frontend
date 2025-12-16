describe('Products Flow', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  it('should display product filters', () => {
    // Check for "Browse Products" header
    cy.contains('h1', 'Browse Products').should('be.visible');
    // Check for search input
    cy.get('input[placeholder="Search for products, categories..."]').should('be.visible');
  });

  it('should display coming soon message', () => {
    cy.contains('Products Catalog').should('be.visible');
    cy.contains('coming soon').should('be.visible');
    cy.contains('Go to My Lists').should('be.visible');
  });

  it('should allow typing in search box', () => {
    // Target specifically the desktop search or ensure we're targeting a visible one
    cy.get(
      '.navbar-search.hidden-mobile input[placeholder="Search for products, categories..."]'
    ).type('Milk');
    cy.get(
      '.navbar-search.hidden-mobile input[placeholder="Search for products, categories..."]'
    ).should('have.value', 'Milk');
  });
});
