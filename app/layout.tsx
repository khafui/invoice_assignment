import RootLayoutComp from '@/components/RootLayoutComp';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoice App',
  description: 'Assignment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <RootLayoutComp>{children}</RootLayoutComp>
      </body>
    </html>
  );
}
