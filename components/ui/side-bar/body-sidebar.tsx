import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { NAV_GROUPS } from '@/constants/navigation';
import Image from 'next/image';

export const BodySidebar = () => {
  return (
    <SidebarContent>
      {NAV_GROUPS.map((group, index) => (
        <SidebarGroup key={group.label || index}>
          {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
          <SidebarGroupContent>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton tooltip={item.tooltip} asChild>
                  <Link href={item.href} className="text-nowrap">
                    {item.icon && <item.icon className="size-6!" />}
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.label}
                        width={24}
                        height={24}
                        className="size-6 rounded-xs"
                      />
                    )}
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
};
