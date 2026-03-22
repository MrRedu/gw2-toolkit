'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ThemeToggler } from '@/components/molecules/theme-toggler';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/side-bar/app-sidebar';
import { Header } from './_components/header';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function Providers({
  children,
  isSidebarOpen,
}: {
  children: React.ReactNode;
  isSidebarOpen: boolean;
}) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <SidebarProvider defaultOpen={isSidebarOpen}>
            <AppSidebar />
            <SidebarInset className="relative">
              <div className="fixed right-0 bottom-0 w-[446px] h-[183px] bg-[url('/images/bg.png')] bg-contain bg-no-repeat rotate-180" />
              <div className="fixed top-14 left-0 right-0 w-full h-full bg-[url('/images/bg-top.png')] bg-contain bg-no-repeat" />

              <Header />
              <main className="max-w-7xl  z-1 mx-auto w-full px-4 md:px-6 lg:px-8 py-8 sm:py-12">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
        <ThemeToggler />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
