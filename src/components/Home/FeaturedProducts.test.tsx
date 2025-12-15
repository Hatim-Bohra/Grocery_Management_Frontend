import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FeaturedProducts } from './FeaturedProducts';

// Mock ProductGrid to avoid testing it implicitly here
vi.mock('../products/ProductGrid', () => ({
    ProductGrid: ({ products }: { products: Array<{ id: string; name: string }> }) => (
        <div data-testid="product-grid">
            {products.map((p) => (
                <div key={p.id}>{p.name}</div>
            ))}
        </div>
    ),
}));

describe('FeaturedProducts Component', () => {
    it('renders section title and description', () => {
        render(<FeaturedProducts />);
        expect(screen.getByText('Featured Products')).toBeInTheDocument();
        expect(screen.getByText('Top picks for your daily needs')).toBeInTheDocument();
    });

    it('renders View All button', () => {
        render(<FeaturedProducts />);
        expect(screen.getByText('View All')).toBeInTheDocument();
    });

    it('renders product grid with products', () => {
        render(<FeaturedProducts />);
        expect(screen.getByTestId('product-grid')).toBeInTheDocument();
        // Check for some static data we know is in the component
        expect(screen.getByText('Organic Bananas')).toBeInTheDocument();
        expect(screen.getByText('Fresh Avocado')).toBeInTheDocument();
    });
});
