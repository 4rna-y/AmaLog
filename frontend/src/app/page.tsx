import AuthorCard from "@/components/common/AuthorCard";
import BlogItem from "@/components/blog/BlogItem";
import TUIButton from "@/components/common/TUIButton";
import { BlogApi } from "@/api/blog"
import Link from "next/link";
import Footer from "@/components/common/Footer";

export const revalidate = 60;

export default async function Home() {

    const bs = await BlogApi.getBlogs(3, 1);

    return (
        <div className="mx-auto px-8 md:px-10 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                <aside className="hidden lg:block lg:col-span-1">

                </aside>

                <main className="lg:col-span-2">
                    <h1 className="text-2xl text-accent-secondary pt-12 pb-0">Blog</h1>

                    <div className="pt-8 pb-8">
                        {bs?.blogs.map((blog) => (
                            <BlogItem key={blog.id} blogData={blog}></BlogItem>
                        ))}
                    </div>

                    <div className="text-center pb-16">
                        <TUIButton variant="underlined">
                            <Link href="/blog">
                                {"More blogs >"} 
                            </Link>
                        </TUIButton>
                    </div>

                    <AuthorCard />
                    <Footer/>
                </main>

                <aside className="hidden lg:block lg:col-span-1">

                </aside>
            </div>
        </div>
    );
}
