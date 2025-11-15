import ImgManageForm from "@/components/admin/ImgManageForm";

export default async function ImgDashboard() {
    return (
        <div>
            <nav className="px-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-accent-secondary">画像管理</h1>
                </div>
            </nav>
            <main className="p-8">
                <ImgManageForm />
            </main>
        </div>
    )
}
