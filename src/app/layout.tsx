import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

import { getServerSession } from 'next-auth';
import ClientSessionProvider from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Auth With NextJs',
    description:
        'Learning Authentication with NextJs and Spring Boot / Spring Security.',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();
    return (
        <html lang="en">
            <body className={inter.className}>
                <ClientSessionProvider session={session}>
                    <Navbar />
                    {children}
                </ClientSessionProvider>
            </body>
        </html>
    );
}
