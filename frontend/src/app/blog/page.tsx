import BlogList from "@/components/blog/BlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Blogs',
    description: 'Ama-Logのブログ一覧',
};

export const revalidate = 60;

export default async function Blog({ searchParams }: { searchParams: { tag?: string } })
{
    const { tag } = await searchParams;

    return (
        <div className="mx-auto px-8 md:px-8 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="hidden lg:block lg:col-span-1"></aside>

                <main className="lg:col-span-2">
                    <h1 className="text-2xl text-accent-secondary pt-12 pb-8">
                        {tag ? `#${tag} Blogs` : 'All Blogs'}
                    </h1>
                    <BlogList tag={tag}/>
                </main>

                <aside className="hidden lg:block lg:col-span-1"></aside>
            </div>
        </div>
    );
}