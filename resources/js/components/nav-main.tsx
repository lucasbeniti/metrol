import { Separator } from '@/components/ui/separator';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [], userType }: { items: NavItem[]; userType: number }) {
  const { url } = usePage();
  const isAdmin = userType === 1;

  const getItem = (title: string) => items.find((item) => item.title === title);
  const dashboardItem = getItem('Dashboard');
  const logsItem = getItem('Logs');
  const reportsItem = getItem('Relatórios');
  const metrologyItem = getItem('Chamados');

  const otherItems = items.filter((item) => !['Dashboard', 'Logs', 'Relatórios', 'Chamados'].includes(item.title));

  const renderMenuItem = (item: NavItem) => {
    const Icon = item.icon;

    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild isActive={item.url === url}>
          <Link href={item.url} prefetch>
            {Icon && <Icon />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Funcionalidades</SidebarGroupLabel>
      <Separator className="my-2" />

      <SidebarMenu className="space-y-2">
        {isAdmin && (
          <>
            {([dashboardItem, logsItem, reportsItem].filter(Boolean) as NavItem[]).map(renderMenuItem)}
            {(dashboardItem || logsItem || reportsItem) && <Separator />}
            {otherItems.map(renderMenuItem)}
            {metrologyItem && <Separator className="my-2" />}
          </>
        )}

        {metrologyItem && renderMenuItem(metrologyItem)}
      </SidebarMenu>
    </SidebarGroup>
  );
}
