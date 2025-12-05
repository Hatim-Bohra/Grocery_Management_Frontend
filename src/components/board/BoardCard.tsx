import React from 'react';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import type { KanbanItem } from '../../types';

interface BoardCardProps {
    item: KanbanItem;
    onMoveLeft?: () => void;
    onMoveRight?: () => void;
    onDelete: () => void;
}

export const BoardCard: React.FC<BoardCardProps> = ({ item, onMoveLeft, onMoveRight, onDelete }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex gap-3 mb-3">
                <img
                    src={item.product.imageUrl || 'https://placehold.co/100x100'}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-50"
                />
                <div>
                    <span className="text-xs font-semibold uppercase text-gray-400">{item.product.category}</span>
                    <h4 className="font-medium text-gray-900 leading-tight">{item.product.name}</h4>
                </div>
            </div>

            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50">
                <span className="text-sm text-gray-500 font-medium">Qty: {item.quantity}</span>

                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    {onMoveLeft && (
                        <button
                            onClick={onMoveLeft}
                            className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900"
                            title="Move Backward"
                        >
                            <ArrowLeft size={16} />
                        </button>
                    )}
                    <button
                        onClick={onDelete}
                        className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600"
                        title="Remove"
                    >
                        <Trash2 size={16} />
                    </button>
                    {onMoveRight && (
                        <button
                            onClick={onMoveRight}
                            className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900"
                            title="Move Forward"
                        >
                            <ArrowRight size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
