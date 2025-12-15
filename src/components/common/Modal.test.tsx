import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from './Modal';

describe('Modal Component', () => {
    it('does not render when not open', () => {
        const handleClose = vi.fn();
        render(
            <Modal isOpen={false} onClose={handleClose}>
                <div>Modal Content</div>
            </Modal>
        );
        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('renders correctly when open', () => {
        const handleClose = vi.fn();
        render(
            <Modal isOpen={true} onClose={handleClose} title="Test Modal">
                <div>Modal Content</div>
            </Modal>
        );
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('calls onClose when backdrop is clicked', () => {
        const handleClose = vi.fn();
        render(
            <Modal isOpen={true} onClose={handleClose}>
                <div>Modal Content</div>
            </Modal>
        );

        // The backdrop is the first div with onClick (based on component structure)
        // It has class 'backdrop-blur-sm'
        // Using querySelector to target it
        const backdrop = document.querySelector('.backdrop-blur-sm');
        if (backdrop) {
            fireEvent.click(backdrop);
            expect(handleClose).toHaveBeenCalledTimes(1);
        } else {
            throw new Error('Backdrop not found');
        }
    });

    it('calls onClose when close button is clicked', () => {
        const handleClose = vi.fn();
        render(
            <Modal isOpen={true} onClose={handleClose} showCloseButton={true}>
                <div>Modal Content</div>
            </Modal>
        );

        const closeBtn = screen.getByRole('button');
        fireEvent.click(closeBtn);
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not close when clicking modal content', () => {
        const handleClose = vi.fn();
        render(
            <Modal isOpen={true} onClose={handleClose}>
                <div>Modal Content</div>
            </Modal>
        );

        const content = screen.getByText('Modal Content');
        fireEvent.click(content);
        expect(handleClose).not.toHaveBeenCalled();
    });
});
