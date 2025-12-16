import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CurrentListBuilder } from './CurrentListBuilder';
import type { GroceryList } from '../../types';

// Mock dependencies
vi.mock('../../api/client', () => ({
  api: {
    share: {
      generateLink: vi.fn().mockResolvedValue({ shareToken: 'abc' }),
    },
  },
}));

vi.mock('../../hooks/useListRealtime', () => ({
  useListRealtime: () => {},
}));

vi.mock('../common/ToastContext', () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock('../common/Modal', () => ({
  default: ({
    isOpen,
    title,
    children,
  }: {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
  }) =>
    isOpen ? (
      <div data-testid="modal">
        <h1>{title}</h1>
        {children}
      </div>
    ) : null,
}));

vi.mock('./AddItemModal', () => ({
  default: () => <div>AddItemModal Mock</div>,
}));

describe('CurrentListBuilder Component', () => {
  const mockList: GroceryList = {
    _id: '123',
    name: 'Weekly Groceries',
    status: 'draft',
    items: [
      { _id: '1', name: 'Milk', status: 'to_buy', listId: '123', quantity: 1 },
      { _id: '2', name: 'Eggs', status: 'done', listId: '123', quantity: 12 },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user-1',
  };

  const defaultProps = {
    list: mockList,
    onUpdateItemStatus: vi.fn(),
    onRemoveItem: vi.fn(),
    onSaveList: vi.fn(),
    onItemAdded: vi.fn(),
  };

  it('renders list name and items', () => {
    render(<CurrentListBuilder {...defaultProps} />);
    expect(screen.getByText('Weekly Groceries')).toBeInTheDocument();
    expect(screen.getByText('Milk')).toBeInTheDocument();
    expect(screen.getByText('Eggs')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<CurrentListBuilder {...defaultProps} list={{ ...mockList, items: [] }} />);
    expect(screen.getByText('Your list is empty')).toBeInTheDocument();
  });

  it('opens add item modal', () => {
    render(<CurrentListBuilder {...defaultProps} />);
    fireEvent.click(screen.getByText('Add Item')); // The floating button
    expect(screen.getByText('AddItemModal Mock')).toBeInTheDocument();
  });

  it('handles item status update', () => {
    render(<CurrentListBuilder {...defaultProps} />);
    const statusButtons = screen.getAllByRole('button', { name: /Change status/i });
    expect(statusButtons.length).toBeGreaterThan(0);

    fireEvent.click(statusButtons[0]);
    expect(defaultProps.onUpdateItemStatus).toHaveBeenCalled();
  });
});
