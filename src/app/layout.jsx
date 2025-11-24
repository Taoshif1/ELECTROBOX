// src/app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { SessionProvider } from '@/app/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ELECTROBOX - Quality Electronic Components Bangladesh',
  description:
    'Your one-stop shop for quality electronic components in Bangladesh. Resistors, capacitors, transformers, breadboards and more!',
  keywords:
    'electronics, components, Bangladesh, resistors, capacitors, transformers, breadboards',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider>
          {children}
          <Toaster position="top-center" richColors expand={false} />
        </SessionProvider>
      </body>
    </html>
  );
}