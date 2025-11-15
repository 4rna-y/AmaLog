'use client';

import { useEffect, useState, useRef } from 'react';

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
    const [input, setInput] = useState(':');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const command = input.trim();

        if (command === ":login") {
            window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/admin/auth/google`;
        }
        else
        if (command === ":dashboard") {
            window.location.href = "./admin/dashboard"
        }

        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.startsWith(':')) {
            setInput(value);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 pb-32 bg-black/80">
            <div className="w-full max-w-2xl mx-4 mt-auto">
                <div className="bg-black border-2 border-accent-primary rounded-lg shadow-2xl">
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            className="w-full px-6 py-4 bg-transparent text-foreground-light text-xl font-mono focus:outline-none"
                            placeholder=":command"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
