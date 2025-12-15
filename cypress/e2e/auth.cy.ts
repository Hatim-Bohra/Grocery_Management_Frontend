describe('Authentication Flow', () => {
  const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'password123',
  };

  beforeEach(() => {
    // Mock API calls
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: { access_token: 'fake-jwt-token' },
    }).as('loginRequest');

    cy.intercept('POST', '**/auth/register', {
      statusCode: 201,
      body: { id: '1', email: 'test@example.com', name: 'Test User' },
    }).as('registerRequest');
  });

  it('should navigate to login page', () => {
    cy.visit('/');
    cy.contains('Sign In').click();
    cy.url().should('include', '/login');
  });

  it('should register a new user', () => {
    cy.visit('/signup');
    cy.get('input[name="firstName"]').type('Test');
    cy.get('input[name="lastName"]').type('User');
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('input[name="confirmPassword"]').type(testUser.password);

    cy.get('button[type="submit"]').click();

    cy.wait('@registerRequest');
    // After successful register, app likely redirects to login
    cy.url().should('include', '/login');
  });

  it('should login with registered user', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');

    // Verify login success
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    // Check for elements visible only when logged in
    // Navbar should have 'Logout' or user icon, but explicit text might be hidden in mobile view
    // Using a more robust check:
    cy.window().then((window) => {
      const token = window.localStorage.getItem('accessToken');
      expect(token).to.equal('fake-jwt-token');
    });
  });

  it('should logout successfully', () => {
    // Manually set token to simulate logged in state
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('accessToken', 'fake-jwt-token');
      },
    });

    // Intercept logout if it's an API call (it's often just local, but check client.ts)
    // client.ts: logout is just localStorage removal, no API call usually unless specified.
    // client.ts says: logout: () => localStorage.removeItem('accessToken')

    // Find logout button. It might be in a menu if mobile or desktop.
    // Navbar has "Logout" button for desktop.
    // Ensure viewport is wide enough or handle multiple visibility.
    cy.viewport(1280, 720);

    cy.contains('button', 'Logout').click();

    cy.url().should('include', '/login');
    cy.window().then((window) => {
      expect(window.localStorage.getItem('accessToken')).to.eq(null);
    });
  });
});
