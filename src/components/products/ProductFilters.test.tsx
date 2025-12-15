import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductFilters } from './ProductFilters';

describe('ProductFilters Component', () => {
    it('renders search input and categories', () => {
        render(
            <ProductFilters
                searchTerm=""
                onSearchChange={() => { }}
                selectedCategory="All"
                onCategoryChange={() => { }}
            />
        );

        expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
        expect(screen.getByText('All')).toBeInTheDocument();
        expect(screen.getByText('Fruits')).toBeInTheDocument();
    });

    it('calls onSearchChange when typing', () => {
        const handleSearch = vi.fn();
        render(
            <ProductFilters
                searchTerm=""
                onSearchChange={handleSearch}
                selectedCategory="All"
                onCategoryChange={() => { }}
            />
        );

        const input = screen.getByPlaceholderText('Search products...');
        fireEvent.change(input, { target: { value: 'banana' } });
        expect(handleSearch).toHaveBeenCalledWith('banana');
    });

    it('calls onCategoryChange when clicking category', () => {
        const handleCategory = vi.fn();
        render(
            <ProductFilters
                searchTerm=""
                onSearchChange={() => { }}
                selectedCategory="All"
                onCategoryChange={handleCategory}
            />
        );

        const fruitBtn = screen.getByText('Fruits');
        fireEvent.click(fruitBtn);
        expect(handleCategory).toHaveBeenCalledWith('Fruits');
    });

    it('highlights selected category', () => {
        render(
            <ProductFilters
                searchTerm=""
                onSearchChange={() => { }}
                selectedCategory="Fruits"
                onCategoryChange={() => { }}
            />
        );

        const fruitBtn = screen.getByText('Fruits');
        // Check class or style that indicates selection (often specific background color)
        // Based on code: bg-emerald-600
        expect(fruitBtn).toHaveClass('bg-emerald-600');

        const vegBtn = screen.getByText('Vegetables');
        expect(vegBtn).not.toHaveClass('bg-emerald-600');
    });
});
