import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'tttzoc',
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents() {
      // implement node event listeners here
    },

    supportFile: false, // Disabling support file for simplicity initially, or can create one if needed
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
