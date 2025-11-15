import AdminRepositoryList from "@/components/admin/AdminRepositoryList";
import TUIButton from "@/components/common/TUIButton";
import Link from "next/link";

export default async function RepositoryDashboard() {
    return (
        <div>
            <nav className="px-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-accent-secondary">Repository管理</h1>
                    <TUIButton variant="underlined">
                        <Link href="/admin/dashboard/repository/create">
                            新規作成
                        </Link>
                    </TUIButton>
                </div>
            </nav>
            <main className="p-8">
                <AdminRepositoryList />
            </main>
        </div>
    )
}
