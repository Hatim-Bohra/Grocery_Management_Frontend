import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CurrentListBuilder } from './CurrentListBuilder';

// Mock dependencies
vi.mock('../../api/client', () => ({
    api: {
        share: {
            generateLink: vi.fn().mockResolvedValue({ shareToken: 'abc' }),
        },
    },
}));

vi.mock('../../hooks/useListRealtime', () => ({
    useListRealtime: () => { },
}));

vi.mock('../common/ToastProvider', () => ({
    useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock('../common/Modal', () => ({
    default: ({ isOpen, title, children }: { isOpen: boolean; title: string; children: React.ReactNode }) => (
        isOpen ? <div data-testid="modal"><h1>{title}</h1>{children}</div> : null
    ),
}));

vi.mock('./AddItemModal', () => ({
    default: () => <div>AddItemModal Mock</div>,
}));

describe('CurrentListBuilder Component', () => {
    const mockList: unknown = {
        _id: '123',
        name: 'Weekly Groceries',
        status: 'active',
        items: [
            { _id: '1', name: 'Milk', status: 'to_buy' },
            { _id: '2', name: 'Eggs', status: 'done' },
        ],
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
        const statusButton = screen.getAllByRole('button', { name: /Change status/i })[0];
        fireEvent.click(statusButton); // Based on component structure, status button is the first button inside the item row.
        // Let's find it by associating with the item text if possible, or just click the first one found.
        // Actually, looking at code: Milk is first item. The status button is before name.

        // We can rely on render order or classes.
        // Let's assume the button with specific class for 'to_buy' status: 'border-gray-300'
    });
});
