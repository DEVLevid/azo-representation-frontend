import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AZO Representation Frontend',
  description: 'Frontend application built with Next.js and Hexagonal Architecture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <main className="py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
