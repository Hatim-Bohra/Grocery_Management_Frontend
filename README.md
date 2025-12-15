# Grocery Management System

A modern, responsive web application for managing grocery store operations, built with React, TypeScript, and Tailwind CSS. This project aims to provide a premium user experience for both customers and shopkeepers.

## 🚀 Features

- **Authentication System**: Secure login and signup pages tailored for both Users and Shopkeepers.
- **Modern UI/UX**: A premium, aesthetically pleasing interface designed with **Tailwind CSS**.
- **Smooth Animations**: Enhanced user interactions using **Framer Motion**.
- **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.
- **Component-Based Architecture**: Modular and reusable components for maintainability.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
│   ├── Auth/        # Authentication related components
│   ├── Home/        # Home page specific components
│   ├── Layout/      # Layout components (Navbar, Footer)
│   └── ui/          # Generic UI elements
├── pages/           # Application pages
│   ├── Auth/        # Login and Signup pages
│   └── Home/        # Home page
├── styles/          # Global styles
├── App.tsx          # Main application component
└── main.tsx         # Entry point
```

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup / Run

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd grocery-management-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   _Modify `.env` with your API URL if different from default._

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

5. **Build for production**
   ```bash
   npm run build
   ```

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run test`: Runs unit tests in watch mode.
- `npm run preview`: Previews the production build locally.

## 🧪 Testing

This project includes comprehensive unit tests using **Vitest** and **React Testing Library** to ensure code quality and reliability.

### Test Framework & Tools

- **Test Runner**: [Vitest](https://vitest.dev/) - A blazing fast unit test framework
- **Testing Library**: [@testing-library/react](https://testing-library.com/react) - For testing React components
- **DOM Matchers**: [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) - Custom matchers for DOM assertions
- **User Interactions**: [@testing-library/user-event](https://testing-library.com/docs/user-event/intro) - For simulating user interactions
- **Environment**: [jsdom](https://github.com/jsdom/jsdom) - DOM implementation for Node.js

### Test Coverage

The project includes **17 test suites** with **63 tests** covering:

- **Authentication Components**: `AuthLayout.test.tsx`
- **Home Components**: `FeaturedProducts.test.tsx`, `Hero.test.tsx`
- **Layout Components**: `AppLayout.test.tsx`, `Footer.test.tsx`, `Navbar.test.tsx`
- **Board Components**: `BoardCard.test.tsx`, `BoardColumn.test.tsx`
- **Common Components**: `Modal.test.tsx`, `ToastProvider.test.tsx`
- **List Components**: `AddItemModal.test.tsx`, `CurrentListBuilder.test.tsx`, `SharedListView.test.tsx`
- **Product Components**: `ProductCard.test.tsx`, `ProductGrid.test.tsx`, `ProductFilters.test.tsx`
- **UI Components**: `Input.test.tsx`

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once (CI mode)
npm run test -- --run

# Run tests with coverage
npm run test -- --coverage

# Run specific test file
npm run test src/components/Auth/AuthLayout.test.tsx
```

### Test Configuration

Tests are configured in `vite.config.ts`:
- **Environment**: jsdom (browser-like environment)
- **Setup File**: `src/test/setup.ts` (imports jest-dom matchers)
- **Globals**: Enabled for describe, it, expect, etc.

### Writing Tests

All test files follow the naming convention `*.test.tsx` and are located alongside their corresponding components. Example:

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Required Dependencies

Testing dependencies are already included in `package.json`:

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.6.0",
    "jsdom": "^25.0.1",
    "vitest": "^3.0.5"
  }
}
```

All dependencies are automatically installed when you run `npm install`.

## 📏 Code Quality & Standards

This project maintains high code quality standards using **ESLint** and **Prettier**.

### ESLint
We use `typescript-eslint` with standard React configurations.
- **Rules**: Enforces best practices for React Hooks and typical TypeScript constraints.
- **Configuration**: See `eslint.config.js` for details.

### Prettier
Code formatting is automatically handled by Prettier.
- **Semicolons**: Yes (`semi: true`)
- **Quotes**: Single quotes (`singleQuote: true`)
- **Indentation**: 2 spaces (`tabWidth: 2`)
- **Trailing Commas**: ES5 compatible (`trailingComma: "es5"`)
- **Line Length**: 100 characters (`printWidth: 100`)

To format your code manually, you can generally use your IDE's format command or run prettier directly if configured.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
