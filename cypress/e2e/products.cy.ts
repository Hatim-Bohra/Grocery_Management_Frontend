describe('Products Flow', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  it('should display product filters', () => {
    // Check for "Browse Products" header
    cy.contains('h1', 'Browse Products').should('be.visible');
    // Check for search input
    cy.get('input[placeholder="Search products..."]').should('be.visible');
  });

  it('should display coming soon message', () => {
    cy.contains('Products Catalog').should('be.visible');
    cy.contains('coming soon').should('be.visible');
    cy.contains('Go to My Lists').should('be.visible');
  });

  it('should allow typing in search box', () => {
    cy.get('input[placeholder="Search products..."]').type('Milk');
    cy.get('input[placeholder="Search products..."]').should('have.value', 'Milk');
  });
});
