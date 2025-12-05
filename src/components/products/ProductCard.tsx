import React from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '../../types';

interface ProductCardProps {
    product: Product;
    onAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                    src={product.imageUrl || 'https://placehold.co/300x300?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{product.category}</p>
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    </div>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg text-sm">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <p className="text-sm text-gray-500 mb-4">per {product.unit}</p>

                <button
                    onClick={() => onAdd(product)}
                    disabled={!product.inStock}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed font-medium"
                >
                    <Plus size={18} />
                    Add to List
                </button>
            </div>
        </div>
    );
};
