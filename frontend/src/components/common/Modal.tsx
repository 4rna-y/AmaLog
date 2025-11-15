'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalContent = (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-50 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-background border-2 border-accent-primary rounded-lg shadow-lg max-w-md w-full mx-4 p-6 animate-in slide-in-from-bottom duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-foreground-light">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-foreground hover:text-accent-primary text-2xl leading-none transition-colors"
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                    </div>
                )}
                <div className="text-foreground-light">
                    {children}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default Modal;
