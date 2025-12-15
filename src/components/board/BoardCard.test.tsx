import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BoardCard } from './BoardCard';
import { KanbanItem } from '../../types';

describe('BoardCard Component', () => {
    const item: KanbanItem = {
        id: '1',
        name: 'Milk',
        status: 'to_buy',
        quantity: 1,
        unit: 'gallon',
        listName: 'Groceries'
    };

    it('renders item details', () => {
        render(<BoardCard item={item} onDelete={() => { }} />);
        expect(screen.getByText('Milk')).toBeInTheDocument();
        expect(screen.getByText(/1 gallon/)).toBeInTheDocument();
        expect(screen.getByText(/Groceries/)).toBeInTheDocument();
    });

    it('renders navigation buttons based on props', () => {
        const handleLeft = vi.fn();
        const handleRight = vi.fn();

        render(
            <BoardCard
                item={item}
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
        render(<BoardCard item={item} onDelete={handleDelete} />);

        const deleteBtn = screen.getByLabelText(/Delete Milk/i);
        fireEvent.click(deleteBtn);
        expect(handleDelete).toHaveBeenCalled();
    });
});
