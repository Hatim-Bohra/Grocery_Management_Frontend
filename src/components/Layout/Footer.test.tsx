import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';
import { BrowserRouter } from 'react-router-dom';

describe('Footer Component', () => {
  const renderFooter = () =>
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

  it('renders company info', () => {
    renderFooter();
    expect(screen.getByText('GrocerFlow')).toBeInTheDocument();
    expect(screen.getByText(/Your trusted partner/i)).toBeInTheDocument();
  });

  it('renders contact info', () => {
    renderFooter();
    expect(screen.getByText('support@grocerflow.com')).toBeInTheDocument();
    expect(screen.getByText('1-800-GROCER')).toBeInTheDocument();
    expect(screen.getByText(/123 Market St/i)).toBeInTheDocument();
  });

  it('renders quick links sections', () => {
    renderFooter();
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Customer Service')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  it('renders specific links', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products');
    expect(screen.getByRole('link', { name: 'Help Center' })).toHaveAttribute('href', '/help');
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
      'href',
      '/privacy'
    );
  });

  it('renders copyright and social links', () => {
    renderFooter();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });
});
