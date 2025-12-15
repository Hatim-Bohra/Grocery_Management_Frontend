describe('Lists Management', () => {
  const user = {
    email: `test${Date.now()}@example.com`,
    password: 'password123',
  };

  beforeEach(() => {
    // Mock Auth
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: { access_token: 'fake-jwt-token' },
    }).as('login');

    // Mock Lists
    cy.intercept('GET', '**/api/lists', {
      statusCode: 200,
      body: [], // Start empty
    }).as('getLists');

    cy.intercept('POST', '**/api/lists', {
      statusCode: 201,
      body: { _id: 'list-123', name: 'My List', status: 'active', items: [] },
    }).as('createList');

    // Mock Add Item
    cy.intercept('POST', '**/api/lists/*/items', {
      statusCode: 201,
      body: { _id: 'item-1', name: 'Bread', quantity: 2, status: 'to_buy' },
    }).as('addItem');

    // Login logic
    cy.visit('/login');
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.contains('button', 'Login to Account').click();
    cy.wait('@login');
  });

  it('should create a new list', () => {
    cy.visit('/lists');
    cy.contains('Create List').click(); // Adjust if text differs
    // Assuming it creates one automatically or opens a modal?
    // Based on sidebar code: to="/lists?new=1"

    // Verify a new list appears or we are on a list detail view
    // Let's assume there's a default "My List" or similar created/shown
    cy.get('input[value="My List"]').should('exist'); // List name input
  });

  it('should add item to list', () => {
    cy.visit('/lists');
    cy.contains('Add Item').click();

    // Modal Interaction
    cy.get('input[placeholder="e.g. Milk"]').type('Bread');
    cy.get('input[placeholder="1"]').clear().type('2');
    cy.contains('button', 'Add Item').click();

    // Verify item added
    cy.contains('Bread').should('be.visible');
    cy.contains('2').should('be.visible');
  });
});
