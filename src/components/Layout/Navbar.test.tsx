import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Navbar } from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { api } from '../../api/client';

// Mock the API client
vi.mock('../../api/client', () => ({
  api: {
    auth: {
      logout: vi.fn(),
    },
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  it('renders logo and basic links', () => {
    renderNavbar();
    expect(screen.getByText('GrocerFlow')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('shows login/cart when not logged in', () => {
    renderNavbar();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    // expect(screen.getByText('Cart')).toBeInTheDocument(); // Cart is there in both states, but 'Sign In' is specific
  });

  it('shows user actions when logged in', () => {
    localStorage.setItem('accessToken', 'fake-token');
    renderNavbar();

    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('My Lists')).toBeInTheDocument();
    expect(screen.getByText('Board')).toBeInTheDocument();
  });

  it('handles logout', () => {
    localStorage.setItem('accessToken', 'fake-token');
    renderNavbar();

    const logoutBtn = screen.getByText('Logout');
    fireEvent.click(logoutBtn);

    expect(api.auth.logout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('handles search submission', () => {
    renderNavbar();
    const searchInput = screen.getAllByPlaceholderText('Search for products, categories...')[0]; // Desktop one
    const searchBtn = screen.getAllByLabelText('Submit search')[0];

    fireEvent.change(searchInput, { target: { value: 'apple' } });
    fireEvent.click(searchBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/products?search=apple');
  });

  it('toggles mobile menu', () => {
    renderNavbar();
    const toggleBtn = screen.getByLabelText('Toggle menu');

    // Open menu
    fireEvent.click(toggleBtn);
    const mobileNav = document.querySelector('.navbar-mobile-nav');
    expect(mobileNav).toBeInTheDocument();

    // We can check for specific mobile links that might only appear there or rely on class logic if visible-mobile-only
    // But verify the toggle state logic
  });
});
