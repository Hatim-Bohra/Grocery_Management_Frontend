import React from 'react';
import { ProductGrid } from '../products/ProductGrid';
import type { Product } from '../products/ProductCard';

const products: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 4.99,
    unit: 'lb',
    category: 'Fruits',
    image:
      'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    inStock: true,
    isNew: true,
  },
  {
    id: '2',
    name: 'Fresh Avocado',
    price: 2.49,
    unit: 'each',
    category: 'Vegetables',
    image:
      'https://images.unsplash.com/photo-1523049673856-6468baca292f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    inStock: true,
  },
  {
    id: '3',
    name: 'Red Strawberries',
    price: 5.99,
    unit: 'lb',
    category: 'Fruits',
    image:
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    inStock: true,
    onSale: true,
    discount: 15,
  },
  {
    id: '4',
    name: 'Whole Milk',
    price: 3.99,
    unit: 'gallon',
    category: 'Dairy',
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    inStock: true,
  },
];

export const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-16 bg-surface">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-secondary">Top picks for your daily needs</p>
          </div>
          <button className="btn btn-ghost">View All</button>
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  );
};
