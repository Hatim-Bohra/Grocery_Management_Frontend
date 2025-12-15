import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SharedListView } from './SharedListView';
import type { GroceryList, ShareData } from '../../types';

// Mock BoardColumn to simplify
vi.mock('../board/BoardColumn', () => ({
    BoardColumn: ({ title, items }: { title: string; items: unknown[] }) => (
        <div data-testid="board-column">
            <h3>{title}</h3>
            <span>{items.length} items</span>
        </div>
    ),
}));

describe('SharedListView Component', () => {
    const mockList: GroceryList = {
        _id: '123',
        name: 'Party List',
        status: 'draft', // Use valid status 'draft' | 'shared' | 'completed'
        items: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: 'user-1',
    };

    const mockItems: any[] = [
        { id: '1', name: 'Chips', status: 'to_buy' },
        { id: '2', name: 'Soda', status: 'done' },
    ];

    const mockShareData: ShareData = {
        shareToken: 'token-123',
        shareUrl: 'http://localhost/share/token-123',
        shopkeeperName: 'John Store',
        createdAt: new Date().toISOString(),
    };

    const defaultProps = {
        list: mockList,
        items: mockItems,
        shareData: mockShareData,
        onUpdateItemStatus: vi.fn(),
        onCompleteList: vi.fn(),
    };

    it('renders list title and store info', () => {
        render(<SharedListView {...defaultProps} />);
        expect(screen.getByText('Party List')).toBeInTheDocument();
        expect(screen.getByText('John Store')).toBeInTheDocument();
    });

    it('renders progress bar info', () => {
        render(<SharedListView {...defaultProps} />);
        expect(screen.getByText('1/2 items done • Status:')).toBeInTheDocument();
    });

    it('renders board columns', () => {
        render(<SharedListView {...defaultProps} />);
        const columns = screen.getAllByTestId('board-column');
        expect(columns).toHaveLength(5); // To Buy, In Progress, Done, Unavailable, Substituted
    });

    it('renders empty state', () => {
        render(<SharedListView {...defaultProps} items={[]} />);
        expect(screen.getByText('No items in this list yet')).toBeInTheDocument();
    });
});
