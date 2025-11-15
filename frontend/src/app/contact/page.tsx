'use client';

import { useState } from 'react';
import TUIButton from '@/components/common/TUIButton';
import Footer from '@/components/common/Footer';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('送信に失敗しました');
            }

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '', website: '' });
        } catch (err) {
            setStatus('error');
            setErrorMessage(err instanceof Error ? err.message : '送信に失敗しました');
        }
    };

    return (
        <div className="mx-auto px-8 md:px-8 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="hidden lg:block lg:col-span-1"></aside>

                <main className="lg:col-span-2">
                    <h1 className="text-4xl font-bold text-accent-secondary pt-12 pb-8">Contact</h1>

                    {status === 'success' ? (
                        <div className="p-6 bg-green-500/20 border border-green-500 rounded-lg">
                            <p className="text-green-400">お問い合わせを受け付けました。</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground-light mb-2">
                                    名前 <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    maxLength={255}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded-lg text-foreground-light focus:outline-none focus:ring-2 focus:ring-accent-primary"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground-light mb-2">
                                    メールアドレス <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    maxLength={255}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded-lg text-foreground-light focus:outline-none focus:ring-2 focus:ring-accent-primary"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-foreground-light mb-2">
                                    件名 <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    required
                                    maxLength={500}
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded-lg text-foreground-light focus:outline-none focus:ring-2 focus:ring-accent-primary"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-foreground-light mb-2">
                                    内容 <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    maxLength={5000}
                                    rows={8}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-2 bg-background-light border border-foreground-dark/20 rounded-lg text-foreground-light focus:outline-none focus:ring-2 focus:ring-accent-primary resize-y"
                                />
                                <p className="text-sm text-foreground-dark mt-1">
                                    {formData.message.length} / 5000
                                </p>
                            </div>

                            <input
                                type="text"
                                name="website"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                style={{ display: 'none' }}
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            {status === 'error' && (
                                <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg">
                                    <p className="text-red-400">{errorMessage}</p>
                                </div>
                            )}

                            <TUIButton
                                disabled={status === 'loading'}
                                className="w-full"
                            >
                                {status === 'loading' ? '送信中...' : '送信する'}
                            </TUIButton>
                        </form>
                    )}

                    <Footer />
                </main>

                <aside className="hidden lg:block lg:col-span-1"></aside>
            </div>
        </div>
    );
}
