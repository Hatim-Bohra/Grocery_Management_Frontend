import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BoardColumn } from './BoardColumn';
import type { KanbanItem } from '../../types';

describe('BoardColumn Component', () => {
  const items: KanbanItem[] = [
    { id: '1', name: 'Item 1', status: 'to_buy', listId: 'list-1', quantity: 1 },
    { id: '2', name: 'Item 2', status: 'to_buy', listId: 'list-1', quantity: 2 },
  ];

  it('renders title and count', () => {
    render(
      <BoardColumn
        status="to_buy"
        title="To Buy"
        items={items}
        color="blue"
        onMoveItem={() => {}}
        onDeleteItem={() => {}}
      />
    );

    expect(screen.getByText('To Buy')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Count
  });

  it('renders items', () => {
    render(
      <BoardColumn
        status="to_buy"
        title="To Buy"
        items={items}
        color="blue"
        onMoveItem={() => {}}
        onDeleteItem={() => {}}
      />
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('passes correct move actions based on status', () => {
    // Status 'to_buy' usually moves forward to 'in_progress', no backward
    const handleMove = vi.fn();
    render(
      <BoardColumn
        status="to_buy"
        title="To Buy"
        items={[items[0]]}
        color="blue"
        onMoveItem={handleMove}
        onDeleteItem={() => {}}
      />
    );

    // Should have right arrow, no left arrow
    expect(screen.queryByLabelText(/previous status/i)).not.toBeInTheDocument();
    const nextBtn = screen.getByLabelText(/next status/i);
    fireEvent.click(nextBtn);
    expect(handleMove).toHaveBeenCalledWith('1', 'in_progress');
  });
});
