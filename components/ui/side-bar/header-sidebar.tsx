import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export const HeaderSidebar = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarTrigger />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
