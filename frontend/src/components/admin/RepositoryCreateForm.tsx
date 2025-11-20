'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MarkdownEditor from './MarkdownEditor';
import TUIButton from '@/components/common/TUIButton';
import BlogContentItem from '../blog/BlogContentItem';

const RepositoryCreateForm: React.FC = () => {
    const router = useRouter();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [isProduct, setIsProduct] = useState(false);
    const [langs, setLangs] = useState<string[]>([]);
    const [newLang, setNewLang] = useState('');
    const [content, setContent] = useState('');
    const [saving, setSaving] = useState(false);

    const handleAddLang = () => {
        if (newLang.trim() && !langs.includes(newLang.trim())) {
            setLangs([...langs, newLang.trim()]);
            setNewLang('');
        }
    };

    const handleRemoveLang = (index: number) => {
        setLangs(langs.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        if (!id.trim() || !name.trim()) {
            alert('ID and name are required');
            return;
        }

        setSaving(true);
        try {
            const payload = {
                id: id.trim(),
                name,
                isProduct,
                langs,
                content: content
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/repos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                
                await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/img/repository`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        "repositoryId": id.trim()
                    })
                });
                

                router.push('/admin/dashboard/repository');
            } else {
                alert('Failed to save');
            }
        } catch {
            alert('Failed to save');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            ID
                        </label>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="repository-id"
                            className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground-light">
                            <input
                                type="checkbox"
                                checked={isProduct}
                                onChange={(e) => setIsProduct(e.target.checked)}
                                className="w-4 h-4 border bg-accent-primary"
                            />
                            Product
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            Languages
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newLang}
                                onChange={(e) => setNewLang(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLang())}
                                placeholder="Add language"
                                className="flex-grow px-4 py-2 bg-background-light border border-foreground-dark/20 rounded text-foreground-light focus:border-accent-primary focus:outline-none"
                            />
                            <TUIButton
                                onClick={handleAddLang}
                                variant="underlined"
                                className="text-foreground-light"
                            >
                                Add
                            </TUIButton>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {langs.map((lang, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-accent-primary/10 text-accent-primary rounded flex items-center gap-2"
                                >
                                    #{lang}
                                    <TUIButton
                                        onClick={() => handleRemoveLang(index)}
                                        variant="underlined"
                                        className="text-foreground-light hover:text-red-400"
                                    >
                                        x
                                    </TUIButton>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground-light mb-2">
                            Content
                        </label>
                        <MarkdownEditor
                            value={content}
                            onChange={setContent}
                            placeholder="Separate paragraphs with line breaks"
                        />
                    </div>
                </div>

                <div>
                    <div className="sticky top-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-foreground-light">Preview</h2>
                        </div>

                        <div className="bg-background-light border border-foreground-dark/20 rounded-lg p-6">
                            <h1 className="text-3xl font-bold text-foreground-light mb-4">{name || '(Name not entered)'}</h1>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {langs.map((lang, index) => (
                                    <span key={index} className="px-2 py-1 bg-accent-primary/10 text-accent-primary text-sm rounded">
                                        #{lang}
                                    </span>
                                ))}
                            </div>
                            <div className="prose prose-lg max-w-none text-foreground-light whitespace-pre-wrap">
                                <BlogContentItem content={content} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-foreground-dark/20">
                <TUIButton
                    onClick={handleSave}
                    disabled={saving}
                    variant="underlined"
                    className="text-accent-primary font-medium"
                >
                    {saving ? 'Saving...' : 'Create'}
                </TUIButton>
                <TUIButton
                    onClick={() => router.push('/admin/dashboard/repository')}
                    variant="underlined"
                    className="text-foreground-light"
                >
                    Cancel
                </TUIButton>
            </div>
        </div>
    );
};

export default RepositoryCreateForm;
