'use client';

import { useState, useEffect } from 'react';
import CommandPalette from './CommandPalette';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isCommandOpen, setIsCommandOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            const isInputField = target.tagName === 'INPUT' ||
                                target.tagName === 'TEXTAREA' ||
                                target.isContentEditable;

            if (e.key === ':' && !isInputField && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                setIsCommandOpen(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            {children}
            <CommandPalette
                isOpen={isCommandOpen}
                onClose={() => setIsCommandOpen(false)}
            />
        </>
    );
}
