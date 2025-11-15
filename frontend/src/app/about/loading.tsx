export default function Loading() {
    return (
        <div className="mx-auto px-8 md:px-8 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="hidden lg:block lg:col-span-1"></aside>

                <main className="lg:col-span-2">
                    <div className="h-8 w-32 bg-foreground-dark/20 rounded mb-8 mt-12 animate-pulse"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-3 grid-rows-1 gap-4 mb-8 animate-pulse">
                        <div className="sm:col-start-2 lg:col-start-1 rounded-full w-28 h-28 mx-auto bg-foreground-dark/20"></div>
                        <div className="col-span-0 col-start-0 sm:col-span-2 sm:col-start-3 lg:col-span-2 lg:col-start-2">
                            <div className="h-6 w-24 bg-foreground-dark/20 rounded mx-auto mb-4"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-foreground-dark/20 rounded"></div>
                                <div className="h-4 w-full bg-foreground-dark/20 rounded"></div>
                                <div className="h-4 w-3/4 bg-foreground-dark/20 rounded"></div>
                            </div>
                        </div>
                    </div>
 
                    <div className="h-8 w-48 bg-foreground-dark/20 rounded mb-8 animate-pulse"></div>

                    <div className="space-y-4 animate-pulse">
                        <div className="h-32 w-full bg-foreground-dark/20 rounded"></div>
                        <div className="h-32 w-full bg-foreground-dark/20 rounded"></div>
                        <div className="h-32 w-full bg-foreground-dark/20 rounded"></div>
                    </div>
                </main>

                <aside className="hidden lg:block lg:col-span-1"></aside>
            </div>
        </div>
    );
}
