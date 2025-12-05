import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SharedListView } from '../../components/lists/SharedListView';
import type { GroceryList } from '../../types';

export const SharedListPage: React.FC = () => {
    const { shareId } = useParams<{ shareId: string }>();
    const [list, setList] = useState<GroceryList | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Mock fetching shared list
        // In real app: await api.share.getByShareId(shareId)
        const fetchSharedList = async () => {
            setLoading(true);
            try {
                // Simulate delay
                await new Promise(resolve => setTimeout(resolve, 800));

                if (shareId === 'mock-share-id') {
                    setList({
                        id: 'shared-1',
                        name: 'Mom\'s Grocery Run',
                        userId: 'user-2',
                        status: 'active',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        items: [
                            {
                                id: 'item-1',
                                productId: '1',
                                quantity: 5,
                                isPurchased: false,
                                product: { id: '1', name: 'Apples', category: 'Fruits', price: 2.5, unit: 'kg', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=300' }
                            },
                            {
                                id: 'item-3',
                                productId: '3',
                                quantity: 2,
                                isPurchased: true,
                                product: { id: '3', name: 'Bread', category: 'Bakery', price: 3.0, unit: 'loaf', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300' },
                            }
                        ]
                    });
                } else {
                    setError('Invalid or expired share link.');
                }
            } catch (err) {
                setError('Failed to load list');
            } finally {
                setLoading(false);
            }
        };

        fetchSharedList();
    }, [shareId]);


    const handleToggleItem = (itemId: string, purchased: boolean) => {
        if (!list) return;

        const updatedItems = list.items.map(item =>
            item.id === itemId ? { ...item, isPurchased: purchased } : item
        );
        setList({ ...list, items: updatedItems });

        // In real app, we'd sync this to backend immediately via socket or API
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (error || !list) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Oops!</h2>
                    <p className="text-gray-500">{error || 'List not found'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <SharedListView list={list} onToggleItem={handleToggleItem} />
        </div>
    );
};
