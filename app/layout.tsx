import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Providers from './providers';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GW2 Toolkit',
  description: 'A collection of tools for Guild Wars 2 players.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isSidebarOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <html
      lang="en"
      className={cn(
        'min-h-svh h-full antialiased font-sans',
        geistSans.variable,
        geistMono.variable,
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-svh flex flex-col relative">
        {/* Background blur blobs */}

        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-50"
        >
          <div className="absolute right-0 -bottom-120 size-140 rounded-full bg-rose-400 opacity-40 blur-[5rem] md:-right-8 md:-bottom-200 md:size-220 dark:opacity-20" />
          <div className="absolute -right-80 -bottom-80 size-140 rounded-full bg-sky-500 opacity-40 blur-[5rem] md:-right-128 md:-bottom-144 md:size-220 dark:opacity-20" />
        </div>

        <Providers isSidebarOpen={isSidebarOpen}>{children}</Providers>
      </body>
    </html>
  );
}
