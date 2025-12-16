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
    cy.contains('New List').click();

    // Fill the modal
    cy.get('input[placeholder="e.g., Weekend BBQ, Monthly Ration"]').type('My List');
    cy.contains('button', 'Create List').click();

    // Verify list name appears in the title (h2) of CurrentListBuilder
    cy.contains('h2', 'My List').should('be.visible');
  });

  it('should add item to list', () => {
    // Override getLists to return a list
    cy.intercept('GET', '**/api/lists', {
      statusCode: 200,
      body: [{ _id: 'list-123', name: 'My List', status: 'draft', items: [] }],
    }).as('getListsWithItems');

    // Mock getById
    cy.intercept('GET', '**/api/lists/list-123', {
      statusCode: 200,
      body: { _id: 'list-123', name: 'My List', status: 'draft', items: [] },
    }).as('getListDetails');

    // Dynamic Mock for items
    let items: { _id: string; name: string; quantity: number; status: string }[] = [];

    cy.intercept('GET', '**/api/lists/list-123/items', (req) => {
      req.reply({ statusCode: 200, body: items });
    }).as('getListItems');

    cy.intercept('POST', '**/api/lists/*/items', (req) => {
      const newItem = { _id: 'item-1', name: 'Bread', quantity: 2, status: 'to_buy' };
      items = [newItem];
      req.reply({ statusCode: 201, body: newItem });
    }).as('addItem');

    cy.visit('/lists');

    // Wait for list loading if necessary, or just interact
    // CurrentListBuilder should be visible
    // Click the FAB (Floating Action Button)
    cy.get('button.absolute.bottom-6').click({ force: true });

    // Modal Interaction
    cy.get('input[placeholder="e.g. Milk"]').type('Bread');
    cy.get('input[placeholder="1"]').clear().type('2');
    cy.contains('button', 'Add Item').click();

    cy.wait('@addItem');
    cy.wait('@getListItems');

    // Verify item added
    cy.contains('Bread').should('be.visible');
    cy.contains('2').should('be.visible');
  });
});
