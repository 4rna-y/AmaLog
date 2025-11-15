import { redirect } from 'next/navigation';
import KeyValueForm from '@/components/admin/KeyValueForm';
import { KeyValueApi } from '@/api/kv';

async function getKeyValue(key: string) {
    try {
        const value = await KeyValueApi.get(key);
        return { key, value };
    } catch {
        return null;
    }
}

export default async function KeyValuePatchPage({ params }: { params: { key: string } }) {
    const { key } = await params;
    const keyvalue = await getKeyValue(decodeURIComponent(key));

    if (!keyvalue) {
        redirect('/admin/dashboard/keyvalue');
    }

    return (
        <div className="min-h-screen bg-background-dark p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground-light">Key-Value 編集</h1>
                    <p className="text-xl text-foreground-dark mt-2">Key: {keyvalue.key}</p>
                </div>
                <KeyValueForm
                    initialKey={keyvalue.key}
                    initialValue={keyvalue.value}
                    isEdit={true}
                />
            </div>
        </div>
    );
}
