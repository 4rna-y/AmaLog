import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import BlogEditForm from '@/components/admin/BlogEditForm';

async function getBlog(id: string) {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('auth');

    if (!authCookie) {
        return null;
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blog/article?id=${id}`,
            {
                headers: {
                    Cookie: `auth=${authCookie.value}`
                },
                cache: 'no-store'
            }
        );

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch {
        return null;
    }
}

export default async function BlogPatchPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const blog = await getBlog(id);

    if (!blog) {
        redirect('/admin/dashboard');
    }

    return (
        <div className="min-h-screen bg-background-dark p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground-light">記事編集</h1>
                    <p className="text-foreground-dark mt-2">ID: {blog.id}</p>
                </div>
                <BlogEditForm blog={blog} />
            </div>
        </div>
    );
}
