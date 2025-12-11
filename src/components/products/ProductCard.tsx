import React from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import './ProductCard.css';

export interface Product {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  unit?: string;
  category?: string;
  image?: string;
  inStock?: boolean;
  isNew?: boolean;
  onSale?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  const displayPrice =
    product.onSale && product.discount
      ? product.price * (1 - product.discount / 100)
      : product.price;

  const handleAddToCart = () => {
    if (onAdd) {
      onAdd(product);
    }
  };

  return (
    <div className="product-card">
      {/* Badges */}
      <div className="product-card-badges">
        {product.isNew && <span className="badge badge-primary">New</span>}
        {product.onSale && <span className="badge badge-error">Sale</span>}
        {!product.inStock && <span className="badge badge-gray">Out of Stock</span>}
      </div>

      {/* Image */}
      <div className="product-card-image">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <div className="product-card-image-placeholder">
            <ShoppingCart size={48} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="product-card-content">
        {/* Category */}
        {product.category && <div className="product-card-category">{product.category}</div>}

        {/* Name */}
        <h3 className="product-card-title">{product.name}</h3>

        {/* Price */}
        <div className="product-card-price">
          <span className="product-card-price-current">${displayPrice.toFixed(2)}</span>
          {product.onSale && product.discount && (
            <span className="product-card-price-original">${product.price.toFixed(2)}</span>
          )}
          {product.unit && <span className="product-card-unit">/ {product.unit}</span>}
        </div>

        {/* Actions */}
        <div className="product-card-actions">
          <button
            className="btn btn-primary product-card-btn"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
