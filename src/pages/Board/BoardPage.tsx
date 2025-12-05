import React, { useState, useEffect } from 'react';
import { BoardColumn } from '../../components/board/BoardColumn';
import type { KanbanItem, KanbanStatus } from '../../types';

export const BoardPage: React.FC = () => {
    const [items, setItems] = useState<KanbanItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Initial Mock Data
    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setItems([
                {
                    id: '1', productId: '1', quantity: 2, isPurchased: false, status: 'to-buy',
                    product: { id: '1', name: 'Apples', category: 'Fruits', price: 2.5, unit: 'kg', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6' }
                },
                {
                    id: '2', productId: '2', quantity: 1, isPurchased: true, status: 'in-progress', // Purchased technically means done? But for Kanban flow let's say 'in cart'
                    product: { id: '2', name: 'Milk', category: 'Dairy', price: 1.2, unit: 'L', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b' }
                },
                {
                    id: '3', productId: '5', quantity: 3, isPurchased: false, status: 'to-buy',
                    product: { id: '5', name: 'Pasta', category: 'Pantry', price: 1.5, unit: 'pack', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8' }
                },
            ]);
            setLoading(false);
        }, 600);
    }, []);

    const handleMoveItem = (itemId: string, newStatus: KanbanStatus) => {
        setItems(prev => prev.map(item =>
            item.id === itemId ? { ...item, status: newStatus } : item
        ));
    };

    const handleDeleteItem = (itemId: string) => {
        if (window.confirm('Are you sure you want to remove this item?')) {
            setItems(prev => prev.filter(item => item.id !== itemId));
        }
    };

    const columns: { id: KanbanStatus; title: string; color: 'gray' | 'blue' | 'emerald' }[] = [
        { id: 'to-buy', title: 'To Buy', color: 'gray' },
        { id: 'in-progress', title: 'In Progress', color: 'blue' },
        { id: 'done', title: 'Done', color: 'emerald' },
    ];

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-140px)]">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Task Board</h1>
                <p className="text-gray-500">Track your shopping progress efficiently</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-x-auto pb-4">
                    {columns.map(col => (
                        <BoardColumn
                            key={col.id}
                            status={col.id}
                            title={col.title}
                            color={col.color}
                            items={items.filter(i => i.status === col.id)}
                            onMoveItem={handleMoveItem}
                            onDeleteItem={handleDeleteItem}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
