import { ContactApi } from "@/api/contact";
import ContactItem from "@/components/admin/ContactItem";
import { cookies } from "next/headers";

export default async function ContactDashboard() {
    
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const contacts = await ContactApi.getContacts(cookieHeader);
    if (!contacts || contacts.length === 0) {
        return <div className="text-center">Not found</div>
    }
    
    return (
        <div>
            <nav className="px-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-accent-secondary">コンタクト一覧</h1>
                </div>
            </nav>
            <main className="p-8">
                {contacts.map((contact) => (
                    <ContactItem key={contact.id} data={contact} />
                ))}
            </main>
        </div>
    );
}
