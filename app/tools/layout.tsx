import { AppSidebar } from '@/components/ui/side-bar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Header } from './_components/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-8 sm:py-12">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
