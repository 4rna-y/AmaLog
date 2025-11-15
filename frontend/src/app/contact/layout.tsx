import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Ama-Logの問い合わせページ',
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
