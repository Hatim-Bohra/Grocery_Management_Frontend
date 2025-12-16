import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';
import { Mail } from 'lucide-react';

describe('Input Component', () => {
  it('renders correctly with label', () => {
    render(<Input label="Email Address" />);
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with an icon', () => {
    render(<Input label="Email" icon={Mail} />);
    // Verify icon renders (lucide icons usually render as SVGs)
    const icon = document.querySelector('.input-icon');
    expect(icon).toBeInTheDocument();
  });

  it('handles user input', () => {
    const handleChange = vi.fn();
    render(<Input label="Username" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('testuser');
  });

  it('displays error message', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('input-error');
  });

  it('renders disabled state', () => {
    render(<Input label="Disabled" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
