'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { LanguageProvider } from '@/lib/i18n/language-context';
import { translations } from '@/lib/i18n/translations';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <LanguageProvider translations={translations}>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
