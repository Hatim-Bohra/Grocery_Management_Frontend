import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToastProvider, useToast } from './ToastProvider';

const TestComponent = () => {
    const { showToast } = useToast();
    return (
        <div>
            <button onClick={() => showToast('success', 'Success Message')}>Show Success</button>
            <button onClick={() => showToast('error', 'Error Message')}>Show Error</button>
        </div>
    );
};

describe('ToastProvider Component', () => {
    it('shows toast when function is called', () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        fireEvent.click(screen.getByText('Show Success'));
        expect(screen.getByText('Success Message')).toBeInTheDocument();
    });

    it('removes toast after timeout', () => {
        vi.useFakeTimers();
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        fireEvent.click(screen.getByText('Show Success'));
        expect(screen.getByText('Success Message')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(4500);
        });

        expect(screen.queryByText('Success Message')).not.toBeInTheDocument();
        vi.useRealTimers();
    });

    it('removes toast when close button clicked', () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        );

        fireEvent.click(screen.getByText('Show Error'));
        const closeBtn = screen.getByRole('button', { name: '' }); // The X button usually doesn't have an accessible name in the code provided, purely relying on rendering
        // Actually the button contains <X size={16} />.
        // Let's find button by looking inside the toast container
        fireEvent.click(closeBtn);

        expect(screen.queryByText('Error Message')).not.toBeInTheDocument();
    });
});
