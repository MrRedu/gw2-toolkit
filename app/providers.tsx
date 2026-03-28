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
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/side-bar/app-sidebar';
import { Header } from './_components/header';
import { ThemeToggler } from '@/components/molecules/theme-toggler';

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
        defaultTheme="dark"
        enableSystem={false}
        forcedTheme="dark"
        // defaultTheme="system"
        // enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <SidebarProvider defaultOpen={isSidebarOpen}>
            <AppSidebar />
            <SidebarInset className="relative">
              {/* ****** Decoration images ************* */}
              {/* <Image
                src="/images/bg-top.png"
                alt=""
                className="fixed left-0 right-0 h-[280px] w-auto opacity-40"
                width={2291}
                height={280}
              />
              <Image
                src="/images/bg.png"
                alt=""
                className="fixed bottom-0 right-0 w-[446px] h-[183px] rotate-180 opacity-40"
                width={446}
                height={183}
              /> */}
              {/* ************************************** */}

              <Header />
              <main>{children}</main>
              <ThemeToggler />
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
