import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './ProductCard';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  loading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="product-card-skeleton">
            <div className="skeleton skeleton-image"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text skeleton-text-short"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <div className="product-grid-empty-icon">📦</div>
        <h3 className="product-grid-empty-title">No products found</h3>
        <p className="product-grid-empty-text">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id || product.id} product={product} onAdd={onAddToCart} />
      ))}
    </div>
  );
};
