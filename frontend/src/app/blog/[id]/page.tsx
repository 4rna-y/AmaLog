import Image from "next/image";
import Link from "next/link";
import TUIButton from "@/components/common/TUIButton";
import { notFound } from "next/navigation";
import BlogContentItem from "@/components/blog/BlogContentItem";
import UpdateHistoryButton from "@/components/blog/UpdateHistoryButton";
import TableOfContents from "@/components/blog/TableOfContents";
import { BlogApi } from "@/api/blog";
import { ImgApi } from "@/api/img";
import { extractHeadings } from "@/utils/extractHeadings";
import Footer from "@/components/common/Footer";
import { cookies } from "next/headers";
import { Tooltip } from "@/components/common/Tooltip";
import { Metadata } from "next";

function extractTextFromContent(content: string): string {
    const text = content.replace(/[#*`_\[\]]/g, "").replace(/!\[.*?\]\(.*?\)/g, "");
    return text.trim().slice(0, 200);
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = await params;
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const blog = await BlogApi.getBlog(id, cookieHeader);

    if (!blog) {
        return {
            title: "Not Found",
        };
    }

    if (blog.status === "UNPUBLISHED" || blog.status === "ONLYKNOWSURL") {
        return {
            title: "Ama-Log",
            description: "Ama's personal blog",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const description = extractTextFromContent(blog.content);
    const ogImageUrl = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/static/${blog.coverImgId}`;

    return {
        title: blog.title,
        description,
        keywords: blog.tag,
        openGraph: {
            title: blog.title,
            description,
            type: "article",
            publishedTime: blog.createdAt,
            modifiedTime: blog.updatedAt,
            authors: ["Ama"],
            tags: blog.tag,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description,
            images: [ogImageUrl],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export const dynamic = 'force-dynamic';

export default async function BlogPage({params}: {params: {id: string}}) {
    const { id } = await params;
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const blog = await BlogApi.getBlog(id, cookieHeader);

    if (!blog) 
    {
        notFound();
    }

    const createdAt = new Date(blog.createdAt);
    const updatedAt = new Date(blog.updatedAt);

    const headings = extractHeadings(blog.content);
    const isOnlyKnowsUrl = blog.status === "ONLYKNOWSURL";

    const description = extractTextFromContent(blog.content);
    const ogImageUrl = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/static/${blog.coverImgId}`;

    const jsonLd = blog.status === "PUBLISHED" ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "image": ogImageUrl,
        "datePublished": blog.createdAt,
        "dateModified": blog.updatedAt,
        "author": {
            "@type": "Person",
            "name": "Ama",
            "url": "https://arnay.net"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Ama-Log",
            "url": "https://arnay.net",
            "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/static/site-log.png`
            }
        },
        "description": description,
        "keywords": blog.tag.join(", "),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://arnay.net/blog/${blog.id}`
        }
    } : null;

    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            {isOnlyKnowsUrl && (
                <div className="fixed inset-0 border-2 border-yellow-500/75 pointer-events-none z-50" style={{ boxShadow: "inset 0 0 15px rgba(234, 179, 8, 0.3)" }} />
            )}
            <div className="mx-auto px-8 md:px-8 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="hidden lg:block lg:col-span-1">

                </aside>

                <main className="lg:col-span-2">
                    <article className="py-12">
                        <header className="mb-12">

                            <div className="relative w-full mb-12 flex justify-center">
                                <Image
                                    src={ImgApi.get(blog.coverImgId)}
                                    alt={blog.title}
                                    width={500}
                                    height={500}
                                    className="rounded-2xl object-contain max-h-96 w-auto"
                                />
                            </div>

                            <h1 className="text-4xl font-bold text-foreground-light mb-4">
                                {blog.title}
                            </h1>

                            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 mb-4">
                                <div className="flex flex-wrap items-center gap-4">
                                    <time className="text-sm text-foreground-light/70">
                                        {createdAt.getFullYear()}/{createdAt.getMonth() + 1}/{createdAt.getDate()}
                                    </time>

                                    <div className="flex flex-wrap gap-2">
                                        {blog.tag.map((tag, index) => (
                                            <TUIButton variant="underlined" key={index} className="py-1 px-3 text-sm">
                                                <Link href={`/blog?tag=${encodeURIComponent(tag)}`}>#{tag}</Link>
                                            </TUIButton>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 sm:ml-auto">
                                    {isOnlyKnowsUrl && (
                                        <Tooltip text="限定公開">
                                            <i className="nf-oct-lock text-2xl text-yellow-500"></i>
                                        </Tooltip>

                                    )}
                                    {blog.blogUpdate.length !== 0 && (
                                        <UpdateHistoryButton updatedAt={updatedAt} blogUpdate={blog.blogUpdate}/>
                                    )}
                                </div>

                            </div>
                        </header>

                        <div className="prose prose-lg max-w-none text-foreground-light">
                            <BlogContentItem content={blog.content} />
                        </div>

                        <div className="mt-12 pt-8 border-t border-foreground-light/20">
                            <Link href="/blog" className="text-accent-secondary hover:underline">
                                ← 記事一覧へ
                            </Link>
                        </div>
                    </article>

                    <Footer />

                </main>

                <aside className="hidden lg:block lg:col-span-1">
                    <TableOfContents headings={headings} />
                </aside>
            </div>
        </div>
        </>
    );
}
