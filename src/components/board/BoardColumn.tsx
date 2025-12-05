import React from 'react';
import type { KanbanItem, KanbanStatus } from '../../types';
import { BoardCard } from './BoardCard';

interface BoardColumnProps {
    status: KanbanStatus;
    title: string;
    items: KanbanItem[];
    color: 'gray' | 'blue' | 'emerald';
    onMoveItem: (itemId: string, newStatus: KanbanStatus) => void;
    onDeleteItem: (itemId: string) => void;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
    status,
    title,
    items,
    color,
    onMoveItem,
    onDeleteItem
}) => {

    const getPrevStatus = (current: KanbanStatus): KanbanStatus | null => {
        if (current === 'in-progress') return 'to-buy';
        if (current === 'done') return 'in-progress';
        return null;
    };

    const getNextStatus = (current: KanbanStatus): KanbanStatus | null => {
        if (current === 'to-buy') return 'in-progress';
        if (current === 'in-progress') return 'done';
        return null;
    };

    const colorStyles = {
        gray: 'bg-gray-100 border-gray-200 text-gray-700',
        blue: 'bg-blue-50 border-blue-100 text-blue-700',
        emerald: 'bg-emerald-50 border-emerald-100 text-emerald-700'
    };

    const badgeStyles = {
        gray: 'bg-gray-200 text-gray-700',
        blue: 'bg-blue-100 text-blue-800',
        emerald: 'bg-emerald-100 text-emerald-800'
    }

    return (
        <div className={`flex flex-col h-full min-h-[500px] rounded-xl ${colorStyles[color]} border p-4`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">{title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${badgeStyles[color]}`}>
                    {items.length}
                </span>
            </div>

            <div className="flex-1 space-y-3">
                {items.map(item => {
                    const prev = getPrevStatus(status);
                    const next = getNextStatus(status);

                    return (
                        <BoardCard
                            key={item.id}
                            item={item}
                            onMoveLeft={prev ? () => onMoveItem(item.id, prev) : undefined}
                            onMoveRight={next ? () => onMoveItem(item.id, next) : undefined}
                            onDelete={() => onDeleteItem(item.id)}
                        />
                    );
                })}
                {items.length === 0 && (
                    <div className="flex h-32 items-center justify-center border-2 border-dashed border-gray-300/50 rounded-lg">
                        <p className="text-gray-400 text-sm font-medium">Empty</p>
                    </div>
                )}
            </div>
        </div>
    );
};
