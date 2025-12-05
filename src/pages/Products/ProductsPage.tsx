import React, { useEffect, useState } from 'react';
import type { Product } from '../../types';
import { api } from '../../api/client';
import { ProductFilters } from '../../components/products/ProductFilters';
import { ProductCard } from '../../components/products/ProductCard';

export const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await api.products.getAll({ search: searchTerm });
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search
        const timeoutId = setTimeout(fetchProducts, 300);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const filteredProducts = products.filter(product => {
        if (selectedCategory && selectedCategory !== 'All') {
            return product.category === selectedCategory;
        }
        return true;
    });

    const handleAddToList = (product: Product) => {
        // Placeholder for now, will implement actual logic in next step
        alert(`Added ${product.name} to list (logic coming soon)`);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Browse Products</h1>
                <p className="text-gray-500">Discover fresh items for your grocery list</p>
            </div>

            <ProductFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={handleAddToList}
                        />
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No products found. Try adjusting your search or filters.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
