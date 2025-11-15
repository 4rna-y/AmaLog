import Link from "next/link"

export default function Dashboard() {
    return (
        <div className="space-y-8 px-4">
            <h1 className="text-2xl font-bold text-accent-secondary">ダッシュボード</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                <Link href={"/admin/dashboard/blog"} className="bg-background-light border border-foreground-dark/20 rounded-lg p-6">
                    <h1 className="text-lg font-semibold text-accent-primary">Blogs</h1>
                </Link>

                <Link href={"/admin/dashboard/contact"} className="bg-background-light border border-foreground-dark/20 rounded-lg p-6">
                    <h1 className="text-lg font-semibold text-accent-primary">Contact</h1>
                </Link>

                <Link href={"/admin/dashboard/repository"} className="bg-background-light border border-foreground-dark/20 rounded-lg p-6">
                    <h1 className="text-lg font-semibold text-accent-primary">Repositories</h1>
                </Link>

                <Link href={"/admin/dashboard/img"} className="bg-background-light border border-foreground-dark/20 rounded-lg p-6">
                    <h1 className="text-lg font-semibold text-accent-primary">Images</h1>
                </Link>

                <Link href={"/admin/dashboard/keyvalue"} className="bg-background-light border border-foreground-dark/20 rounded-lg p-6">
                    <h1 className="text-lg font-semibold text-accent-primary">KeyValues</h1>
                </Link>
            </div>
        </div>
    );
}