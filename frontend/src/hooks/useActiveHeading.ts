'use client';

import { useEffect, useState } from 'react';

export function useActiveHeading(headingIds: string[]) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        if (headingIds.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(entry => entry.isIntersecting);

                if (visibleEntries.length > 0) {
                const firstVisible = visibleEntries.reduce((prev, current) => {
                    return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current;
                });

                setActiveId(firstVisible.target.id);
            }
        },
        {
            rootMargin: '-20px 0px -50% 0px',
            threshold: 0,
        });

        const headingElements = headingIds
            .map(id => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        headingElements.forEach(element => observer.observe(element));

        return () => {
            headingElements.forEach(element => observer.unobserve(element));
        };
    }, 
    [headingIds]);

    return activeId;
}
