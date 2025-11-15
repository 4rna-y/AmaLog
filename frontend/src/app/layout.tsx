import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import ClientLayout from "@/components/common/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arnay.net'),
  title: {
    default: 'Ama-Log',
    template: '%s | Ama-Log'
  },
  description: 'Ama-Logのトップページ',
  authors: [{ name: 'Ama', url: 'https://arnay.net' }],
  creator: 'Ama',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://arnay.net',
    siteName: 'Ama-Log',
    title: 'Ama-Log',
    description: 'Ama-Logのトップページ',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/static/site-log.png`,
        width: 1200,
        height: 630,
        alt: 'Ama-Log',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@4rna_y',
    creator: '@4rna_y',
    title: 'Ama-Log',
    description: 'Ama-Logのトップページ',
    images: [`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/static/site-log.png`],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
