import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BoardCard } from './BoardCard';
import type { KanbanItem } from '../../types';

describe('BoardCard Component', () => {
    const mockItem: KanbanItem = {
        id: '1',
        name: 'Milk',
        status: 'to_buy',
        quantity: 1,
        unit: 'l',
        listName: 'Groceries',
        listId: 'list-123',
    };

    it('renders item details', () => {
        render(<BoardCard item={mockItem} onDelete={() => { }} />);
        expect(screen.getByText('Milk')).toBeInTheDocument();
        expect(screen.getByText(/1 l/)).toBeInTheDocument();
        expect(screen.getByText(/Groceries/)).toBeInTheDocument();
    });

    it('renders navigation buttons based on props', () => {
        const handleLeft = vi.fn();
        const handleRight = vi.fn();

        render(
            <BoardCard
                item={mockItem}
                onDelete={() => { }}
                onMoveLeft={handleLeft}
                onMoveRight={handleRight}
            />
        );

        // Look for arrow buttons using aria-labels or roles
        const moveLeftBtn = screen.getByLabelText(/Move Milk to previous status/i);
        const moveRightBtn = screen.getByLabelText(/Move Milk to next status/i);

        expect(moveLeftBtn).toBeInTheDocument();
        expect(moveRightBtn).toBeInTheDocument();

        fireEvent.click(moveLeftBtn);
        expect(handleLeft).toHaveBeenCalled();

        fireEvent.click(moveRightBtn);
        expect(handleRight).toHaveBeenCalled();
    });

    it('calls delete handler', () => {
        const handleDelete = vi.fn();
        render(<BoardCard item={mockItem} onDelete={handleDelete} />);

        const deleteBtn = screen.getByLabelText(/Delete Milk/i);
        fireEvent.click(deleteBtn);
        expect(handleDelete).toHaveBeenCalled();
    });
});
