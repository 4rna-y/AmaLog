'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-8">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-accent-primary mb-4">500</h1>
                <h2 className="text-2xl font-semibold text-foreground-light mb-4">
                    エラーが発生しました
                </h2>
                <p className="text-foreground-light/70 mb-8">
                    申し訳ございません。予期しないエラーが発生しました。
                </p>
                <button
                    onClick={reset}
                    className="inline-block px-6 py-3 bg-accent-secondary text-background-dark rounded-lg hover:opacity-80 transition-opacity"
                >
                    もう一度試す
                </button>
            </div>
        </div>
    );
}
