import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StackProvider } from '@stackframe/stack';
import { stackServerApp } from '@/lib/stack-auth';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Medilios - Beautiful Task Management',
  description: 'A stunning glassmorphism task tracker with collaborative features',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <StackProvider app={stackServerApp}>
          {children}
        </StackProvider>
      </body>
    </html>
  );
}
