import RepositoryCreateForm from '@/components/admin/RepositoryCreateForm';

export default function RepositoryCreatePage() {
    return (
        <div className="min-h-screen bg-background-dark p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground-light">Repository新規作成</h1>
                </div>
                <RepositoryCreateForm />
            </div>
        </div>
    );
}
