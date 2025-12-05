import React, { useState, useEffect } from 'react';
import { CurrentListBuilder } from '../../components/lists/CurrentListBuilder';
import type { GroceryList } from '../../types';
// import { api } from '../../api/client';

export const ListPage: React.FC = () => {
    // Mock initial list for demonstration
    const [currentList, setCurrentList] = useState<GroceryList | null>(null);

    // Load mock data on mount if empty
    useEffect(() => {
        // Simulating fetching the active draft list
        const mockDraft: GroceryList = {
            id: 'draft-1',
            name: 'Weekly Groceries',
            userId: 'user-1',
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            items: [
                {
                    id: 'item-1',
                    productId: '1',
                    quantity: 2,
                    isPurchased: false,
                    product: { id: '1', name: 'Apples', category: 'Fruits', price: 2.5, unit: 'kg', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=300' }
                },
                {
                    id: 'item-2',
                    productId: '2',
                    quantity: 1,
                    isPurchased: false,
                    product: { id: '2', name: 'Milk', category: 'Dairy', price: 1.2, unit: 'L', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=300' }
                }
            ]
        };
        setCurrentList(mockDraft);
    }, []);


    const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
        if (!currentList) return;

        const updatedItems = currentList.items.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCurrentList({ ...currentList, items: updatedItems });
    };

    const handleRemoveItem = (itemId: string) => {
        if (!currentList) return;

        const updatedItems = currentList.items.filter(item => item.id !== itemId);
        setCurrentList({ ...currentList, items: updatedItems });
    };

    const handleSaveList = async (name: string) => {
        if (!currentList) return;
        try {
            // await api.lists.create({ ...currentList, name }); 
            // In a real app we'd save to backend. 
            // For now, just update local name
            setCurrentList({ ...currentList, name });
            alert('List saved successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    const handleShareList = async () => {
        if (!currentList) return;
        try {
            // const link = await api.lists.share(currentList.id);
            // alert(`Share link generated: ${window.location.origin}/share/${link.id}`);
            alert(`Share link generated: ${window.location.origin}/share/mock-share-id`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">My Shopping List</h1>
                <p className="text-gray-500">Manage your current shopping items</p>
            </div>

            <CurrentListBuilder
                list={currentList}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onSaveList={handleSaveList}
                onShareList={handleShareList}
            />
        </div>
    );
};
