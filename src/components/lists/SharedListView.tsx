import React from 'react';
import type { GroceryList } from '../../types';
import { Check, Square } from 'lucide-react';

interface SharedListViewProps {
    list: GroceryList;
    onToggleItem: (itemId: string, purchased: boolean) => void;
}

export const SharedListView: React.FC<SharedListViewProps> = ({ list, onToggleItem }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl mx-auto my-8">
            <div className="bg-emerald-600 p-6 text-white text-center">
                <h1 className="text-2xl font-bold mb-1">{list.name}</h1>
                <p className="text-emerald-100">Shared Grocery List • {list.items.length} items</p>
            </div>

            <div className="divide-y divide-gray-100">
                {list.items.map((item) => (
                    <div
                        key={item.id}
                        className={`p-4 flex items-center gap-4 transition-colors cursor-pointer ${item.isPurchased ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                        onClick={() => onToggleItem(item.id, !item.isPurchased)}
                    >
                        <div className={`p-1 rounded-md ${item.isPurchased ? 'text-emerald-500' : 'text-gray-300'}`}>
                            {item.isPurchased ? <Check size={24} /> : <Square size={24} />}
                        </div>

                        <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className={`w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200 ${item.isPurchased ? 'opacity-50 grayscale' : ''}`}
                        />

                        <div className="flex-1">
                            <h3 className={`font-semibold ${item.isPurchased ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{item.product.name}</h3>
                            <p className="text-sm text-gray-500">{item.quantity} {item.product.unit}</p>
                        </div>

                        {item.product.description && (
                            <div className="text-sm text-gray-400 italic">
                                {item.product.description}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="p-4 bg-gray-50 text-center text-sm text-gray-500">
                Tap items to mark them as done
            </div>
        </div>
    );
};
