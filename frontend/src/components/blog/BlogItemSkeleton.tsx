export default function BlogItemSkeleton() {
    return (
        <div className="mb-16 animate-pulse">
            <div className="flex items-center gap-2 mb-4">
                <div className="h-4 w-32 bg-foreground-dark/20 rounded"></div>
                <div className="h-4 w-20 bg-foreground-dark/20 rounded"></div>
            </div>

            <div className="h-8 w-3/4 bg-foreground-dark/20 rounded mb-4"></div>

            <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-foreground-dark/20 rounded"></div>
                <div className="h-4 w-full bg-foreground-dark/20 rounded"></div>
                <div className="h-4 w-2/3 bg-foreground-dark/20 rounded"></div>
            </div>

            <div className="flex gap-2">
                <div className="h-6 w-16 bg-foreground-dark/20 rounded"></div>
                <div className="h-6 w-20 bg-foreground-dark/20 rounded"></div>
            </div>
        </div>
    );
}
