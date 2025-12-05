import React, { useState } from 'react';
import { Trash2, Plus, Minus, Save, Share2 } from 'lucide-react';
import type { GroceryList } from '../../types';

interface CurrentListBuilderProps {
    list: GroceryList | null;
    onUpdateQuantity: (itemId: string, newQuantity: number) => void;
    onRemoveItem: (itemId: string) => void;
    onSaveList: (name: string) => void;
    onShareList: () => void;
}

export const CurrentListBuilder: React.FC<CurrentListBuilderProps> = ({
    list,
    onUpdateQuantity,
    onRemoveItem,
    onSaveList,
    onShareList
}) => {
    const [listName, setListName] = useState(list?.name || 'My New List');
    const [isEditingName, setIsEditingName] = useState(false);

    if (!list || list.items.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your list is empty</h3>
                <p className="text-gray-500 mb-6">Go to the Products page to start adding items.</p>
                <a href="/products" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors">
                    Browse Products
                </a>
            </div>
        );
    }

    const totalCost = list.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    {isEditingName ? (
                        <input
                            type="text"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            onBlur={() => setIsEditingName(false)}
                            autoFocus
                            className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-emerald-500 focus:outline-none"
                        />
                    ) : (
                        <h2
                            onClick={() => setIsEditingName(true)}
                            className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-emerald-700 flex items-center gap-2"
                        >
                            {listName}
                        </h2>
                    )}
                    <p className="text-sm text-gray-500">{list.items.length} items</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onShareList}
                        className="flex items-center gap-2 px-4 py-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors font-medium"
                    >
                        <Share2 size={18} />
                        Share
                    </button>
                    <button
                        onClick={() => onSaveList(listName)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-colors font-medium shadow-sm hover:shadow"
                    >
                        <Save size={18} />
                        Save List
                    </button>
                </div>
            </div>

            <div className="divide-y divide-gray-100">
                {list.items.map((item) => (
                    <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                        <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-lg object-cover bg-gray-100 border border-gray-200"
                        />

                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">${item.product.price.toFixed(2)} / {item.product.unit}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                                <button
                                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                    className="p-1 hover:bg-gray-100 rounded text-gray-600 disabled:opacity-50"
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                                <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 hover:bg-gray-100 rounded text-gray-600"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <div className="text-right min-w-[80px]">
                                <p className="font-bold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>

                            <button
                                onClick={() => onRemoveItem(item.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center text-lg">
                    <span className="font-medium text-gray-600">Total Estimated Cost</span>
                    <span className="font-bold text-gray-900 text-2xl">${totalCost.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};
