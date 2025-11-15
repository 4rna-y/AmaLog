export default function Loading() {
    return (
        <div className="mx-auto px-8 md:px-8 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="hidden lg:block lg:col-span-1"></aside>

                <main className="lg:col-span-2">
                    <article className="py-12 animate-pulse">
                        <header className="mb-12">
                            <div className="relative w-full mb-12 flex justify-center">
                                <div className="w-full max-w-lg h-96 bg-foreground-dark/20 rounded-2xl"></div>
                            </div>

                            <div className="h-10 w-3/4 bg-foreground-dark/20 rounded mb-4"></div>

                            <div className="flex flex-wrap gap-4 mb-4">
                                <div className="h-4 w-24 bg-foreground-dark/20 rounded"></div>
                                <div className="h-6 w-16 bg-foreground-dark/20 rounded"></div>
                                <div className="h-6 w-20 bg-foreground-dark/20 rounded"></div>
                            </div>
                        </header>

                        <div className="space-y-4">
                            <div className="h-4 w-full bg-foreground-dark/20 rounded"></div>
                            <div className="h-4 w-full bg-foreground-dark/20 rounded"></div>
                            <div className="h-4 w-5/6 bg-foreground-dark/20 rounded"></div>
                            <div className="h-4 w-full bg-foreground-dark/20 rounded"></div>
                            <div className="h-4 w-4/5 bg-foreground-dark/20 rounded"></div>
                            <div className="h-4 w-full bg-foreground-dark/20 rounded"></div>
                            <div className="h-4 w-3/4 bg-foreground-dark/20 rounded"></div>
                            <div className="h-4 w-full bg-foreground-dark/20 rounded"></div>
                            <div className="h-4 w-2/3 bg-foreground-dark/20 rounded"></div>
                        </div>
                    </article>
                </main>

                <aside className="hidden lg:block lg:col-span-1"></aside>
            </div>
        </div>
    );
}
