import BlogCreateForm from '@/components/admin/BlogCreateForm';

export default function BlogCreatePage() {
    return (
        <div className="min-h-screen bg-background-dark p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground-light">新規記事作成</h1>
                </div>
                <BlogCreateForm />
            </div>
        </div>
    );
}
