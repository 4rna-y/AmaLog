import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function verifyAuth() {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('auth');

    if (!authCookie) {
        return false;
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/admin/auth/verify`,
            {
                headers: {
                    Cookie: `auth=${authCookie.value}`
                },
                cache: 'no-store'
            }
        );

        return response.ok;
    } catch {
        return false;
    }
}

export default async function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    const isAuthenticated = await verifyAuth();

    if (!isAuthenticated) {
        redirect('/');
    }

    return (
        <div className="min-h-screen bg-background-dark">
            <nav className="border-b border-foreground-dark/20 px-12 py-4">
                <div className="flex items-center justify-between">
                    <Link href={"/admin/dashboard/"} className="text-2xl font-bold text-accent-secondary">管理画面</Link>
                    <a
                        href={`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/admin/auth/logout`}
                        className="text-foreground-light hover:text-accent-primary transition-colors"
                    >
                        ログアウト
                    </a>
                </div>
            </nav>
            <main className="p-8">
                {children}
            </main>
        </div>
    );
}
