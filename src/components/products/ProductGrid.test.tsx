import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductGrid } from './ProductGrid';

// Mock ProductCard
vi.mock('./ProductCard', () => ({
    ProductCard: ({ product }: { product: { name: string } }) => <div data-testid="product-card">{product.name}</div>,
}));

describe('ProductGrid Component', () => {
    const products: Array<{ id: string; name: string; price: number }> = [
        { id: '1', name: 'Product 1', price: 10 },
        { id: '2', name: 'Product 2', price: 20 },
    ];

    it('renders loading skeletons', () => {
        const { container } = render(<ProductGrid products={[]} loading={true} />);
        // Check for skeleton classes
        const skeletons = container.querySelectorAll('.skeleton');
        expect(skeletons.length).toBeGreaterThan(0);
    });

    it('renders empty state', () => {
        render(<ProductGrid products={[]} loading={false} />);
        expect(screen.getByText('No products found')).toBeInTheDocument();
    });

    it('renders products', () => {
        render(<ProductGrid products={products} loading={false} />);
        const cards = screen.getAllByTestId('product-card');
        expect(cards).toHaveLength(2);
        expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
});
