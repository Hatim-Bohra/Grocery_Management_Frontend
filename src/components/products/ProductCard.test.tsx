import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard, type Product } from './ProductCard';

const mockProduct: Product = {
    id: '1',
    name: 'Fresh Apple',
    price: 2.99,
    category: 'Fruits',
    image: 'apple.jpg',
    inStock: true,
    unit: 'kg',
};

describe('ProductCard Component', () => {
    it('renders product information correctly', () => {
        render(<ProductCard product={mockProduct} />);

        expect(screen.getByText('Fresh Apple')).toBeInTheDocument();
        expect(screen.getByText('$2.99')).toBeInTheDocument();
        expect(screen.getByText('/ kg')).toBeInTheDocument();
        expect(screen.getByText('Fruits')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'apple.jpg');
    });

    it('renders sale price correctly', () => {
        const saleProduct = { ...mockProduct, onSale: true, discount: 20 };
        render(<ProductCard product={saleProduct} />);

        const expectedPrice = (2.99 * 0.8).toFixed(2);
        expect(screen.getByText(`$${expectedPrice}`)).toBeInTheDocument();
        expect(screen.getByText('$2.99')).toHaveClass('product-card-price-original');
        expect(screen.getByText('Sale')).toBeInTheDocument(); // Badge
    });

    it('renders out of stock state', () => {
        const outOfStockProduct = { ...mockProduct, inStock: false };
        render(<ProductCard product={outOfStockProduct} />);

        expect(screen.getByText('Out of Stock')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add fresh apple to cart/i })).toBeDisabled();
    });

    it('calls onAdd when add button is clicked', () => {
        const handleAdd = vi.fn();
        render(<ProductCard product={mockProduct} onAdd={handleAdd} />);

        const addBtn = screen.getByRole('button', { name: /add fresh apple to cart/i });
        fireEvent.click(addBtn);

        expect(handleAdd).toHaveBeenCalledTimes(1);
        expect(handleAdd).toHaveBeenCalledWith(mockProduct);
    });
});
