import { Separator } from '@/components/ui/separator';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [], userType }: { items: NavItem[]; userType: number }) {
  const page = usePage();

  const isAdmin = userType === 1;

  const dashboardItem = items.find((item) => item.url === '/dashboard');
  const metrologyItem = items.find((item) => item.url === '/metrology-calls');
  const otherItems = items.filter((item) => item.url !== '/dashboard' && item.url !== '/metrology-calls');

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Funcionalidades</SidebarGroupLabel>
      <Separator className="my-2" />

      <SidebarMenu className="space-y-2">
        {isAdmin && dashboardItem && (
          <SidebarMenuItem key={dashboardItem.title}>
            <SidebarMenuButton asChild isActive={dashboardItem.url === page.url}>
              <Link href={dashboardItem.url} prefetch>
                {dashboardItem.icon && <dashboardItem.icon />}
                <span>{dashboardItem.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}

        {isAdmin && dashboardItem && <Separator className="my-2" />}

        {isAdmin &&
          otherItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.url === page.url}>
                <Link href={item.url} prefetch>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

        {isAdmin && metrologyItem && <Separator className="my-2" />}

        {metrologyItem && (
          <SidebarMenuItem key={metrologyItem.title}>
            <SidebarMenuButton asChild isActive={metrologyItem.url === page.url}>
              <Link href={metrologyItem.url} prefetch>
                {metrologyItem.icon && <metrologyItem.icon />}
                <span>{metrologyItem.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
