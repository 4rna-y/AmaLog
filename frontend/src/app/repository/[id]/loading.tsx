export default function Loading() {
    return (
        <div className="mx-auto px-8 md:px-8 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="hidden lg:block lg:col-span-1"></aside>

                <main className="lg:col-span-2">
                    <article className="py-12 animate-pulse">
                        <header className="mb-8">
                            <div className="h-10 w-3/4 bg-foreground-dark/20 rounded mb-4"></div>

                            <div className="flex gap-2 mb-6">
                                <div className="h-6 w-20 bg-foreground-dark/20 rounded"></div>
                            </div>

                            <div className="relative w-full mb-8 flex justify-center">
                                <div className="w-full max-w-2xl h-64 bg-foreground-dark/20 rounded-2xl"></div>
                            </div>
                        </header>

                        <div className="space-y-4">
                            <div className="h-4 w-full bg-foreground-dark/20 rounded"></div>
                            <div className="h-4 w-full bg-foreground-dark/20 rounded"></div>
                            <div className="h-4 w-5/6 bg-foreground-dark/20 rounded"></div>
                            <div className="h-4 w-full bg-foreground-dark/20 rounded"></div>
                            <div className="h-4 w-4/5 bg-foreground-dark/20 rounded"></div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="h-10 w-32 bg-foreground-dark/20 rounded"></div>
                            <div className="h-10 w-32 bg-foreground-dark/20 rounded"></div>
                        </div>
                    </article>
                </main>

                <aside className="hidden lg:block lg:col-span-1"></aside>
            </div>
        </div>
    );
}
