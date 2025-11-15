import BlogItemSkeleton from "@/components/blog/BlogItemSkeleton";

export default function Loading() {
    return (
        <div className="mx-auto px-8 md:px-8 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="hidden lg:block lg:col-span-1"></aside>

                <main className="lg:col-span-2">
                    <div className="h-8 w-48 bg-foreground-dark/20 rounded mb-8 mt-12 animate-pulse"></div>

                    <BlogItemSkeleton />
                    <BlogItemSkeleton />
                    <BlogItemSkeleton />
                </main>

                <aside className="hidden lg:block lg:col-span-1"></aside>
            </div>
        </div>
    );
}
