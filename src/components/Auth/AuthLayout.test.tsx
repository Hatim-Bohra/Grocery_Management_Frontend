import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuthLayout } from './AuthLayout';
import React from 'react';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<unknown>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('AuthLayout Component', () => {
  it('renders title and subtitle', () => {
    render(
      <AuthLayout title="Welcome Back" subtitle="Please sign in">
        <form>Login Form</form>
      </AuthLayout>
    );

    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Please sign in')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <AuthLayout title="Title" subtitle="Subtitle">
        <div data-testid="auth-child">Child Content</div>
      </AuthLayout>
    );

    expect(screen.getByTestId('auth-child')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
