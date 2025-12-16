import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AddItemModal from './AddItemModal';
import { api } from '../../api/client';

// Mock API
vi.mock('../../api/client', () => ({
  api: {
    items: {
      add: vi.fn(),
    },
  },
}));

// Mock Toast
const mockShowToast = vi.fn();
vi.mock('../common/ToastContext', () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

describe('AddItemModal Component', () => {
  const defaultProps = {
    listId: '123',
    onClose: vi.fn(),
    onItemAdded: vi.fn(),
  };

  it('renders modal with form', () => {
    render(<AddItemModal {...defaultProps} />);
    expect(screen.getByText('Add New Item')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. Milk')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(<AddItemModal {...defaultProps} />);

    // Fill form
    fireEvent.change(screen.getByPlaceholderText('e.g. Milk'), { target: { value: 'Milk' } });
    fireEvent.change(screen.getByPlaceholderText('1'), { target: { value: '2' } });

    // Submit
    const submitBtn = screen.getByText('Add Item');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.items.add).toHaveBeenCalledWith(
        '123',
        expect.objectContaining({
          name: 'Milk',
          quantity: 2,
        })
      );
      expect(mockShowToast).toHaveBeenCalled();
      expect(defaultProps.onItemAdded).toHaveBeenCalled();
    });
  });

  it('disables submit button if name is empty', () => {
    render(<AddItemModal {...defaultProps} />);
    const submitBtn = screen.getByRole('button', { name: /add item/i });
    expect(submitBtn).toBeDisabled();
  });
});
