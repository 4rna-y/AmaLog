import KeyValueForm from '@/components/admin/KeyValueForm';

export default function KeyValueCreatePage() {
    return (
        <div className="min-h-screen bg-background-dark p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground-light">Key-Value 新規作成</h1>
                </div>
                <KeyValueForm />
            </div>
        </div>
    );
}
