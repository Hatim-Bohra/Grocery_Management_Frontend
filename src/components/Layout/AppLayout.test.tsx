import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AppLayout } from './AppLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { api } from '../../api/client';

// Mock API
vi.mock('../../api/client', () => ({
    api: {
        auth: {
            logout: vi.fn(),
        },
    },
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('AppLayout Component', () => {
    const renderAppLayout = () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<div>Dashboard Content</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    };

    it('renders sidebar and main content', () => {
        renderAppLayout();
        const branding = screen.getAllByText('GrocerFlow');
        expect(branding.length).toBeGreaterThan(0);
        expect(screen.getByText('Management System')).toBeInTheDocument();
        expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument(); // Nav item
    });

    it('handles logout from sidebar', () => {
        renderAppLayout();
        const logoutBtn = screen.getByText('Sign Out');
        fireEvent.click(logoutBtn);

        expect(api.auth.logout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    // Mobile specific tests would usually require viewport resizing
    // which is possible in jsdom but can be flaky if components rely on `window.matchMedia`
    // We mocked matchMedia in setup.ts so we can test logic effectively if we could trigger it.
    // However, the `visible-mobile-only` classes rely on CSS which jsdom doesn't fully implement
    // so `screen.getByText` might find elements even if they are 'hidden'.
    // We check for presence in the DOM.
});
