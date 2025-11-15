import BlogItemSkeleton from "@/components/blog/BlogItemSkeleton";

export default function Loading() {
    return (
        <div className="mx-auto px-8 md:px-10 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="hidden lg:block lg:col-span-1"></aside>

                <main className="lg:col-span-2">
                    <div className="h-8 w-32 bg-foreground-dark/20 rounded mb-8 mt-12 animate-pulse"></div>

                    <div className="pt-8 pb-8">
                        <BlogItemSkeleton />
                        <BlogItemSkeleton />
                        <BlogItemSkeleton />
                    </div>

                    <div className="w-full h-40 bg-foreground-dark/20 rounded-lg mb-8 animate-pulse"></div>
                </main>

                <aside className="hidden lg:block lg:col-span-1"></aside>
            </div>
        </div>
    );
}
