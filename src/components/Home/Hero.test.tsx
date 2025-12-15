import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Hero } from './Hero';

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    },
}));

describe('Hero Component', () => {
    it('renders hero content', () => {
        render(<Hero />);
        expect(screen.getByText('Fresh Groceries')).toBeInTheDocument();
        expect(screen.getByText('Delivered Fast')).toBeInTheDocument(); // Gradient text
        expect(screen.getByText(/Same Day Delivery/i)).toBeInTheDocument();
    });

    it('renders call to action buttons', () => {
        render(<Hero />);
        expect(screen.getByText('Start Shopping')).toBeInTheDocument();
        expect(screen.getByText('View Categories')).toBeInTheDocument();
    });

    it('renders statistics', () => {
        render(<Hero />);
        expect(screen.getByText('15k+')).toBeInTheDocument();
        expect(screen.getByText('Happy Customers')).toBeInTheDocument();
        expect(screen.getByText('2k+')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('renders hero image', () => {
        render(<Hero />);
        const img = screen.getByAltText('Fresh Grocery Bag');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src');
    });
});
