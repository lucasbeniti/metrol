import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { LayoutGrid, Wrench, MonitorCog, PackageSearch, Ruler, Theater, Users2Icon, UsersRound } from 'lucide-react';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Chamados',
    url: '/metrology-calls',
    icon: Ruler,
  },
  {
    title: 'Peças',
    url: '/items',
    icon: PackageSearch,
  },
  {
    title: 'Ferramentas',
    url: '/tools',
    icon: Wrench,
  },
  {
    title: 'Máquinas',
    url: '/machines',
    icon: MonitorCog,
  },
  {
    title: 'Centros de Custo',
    url: '/cost-centers',
    icon: Theater,
  },
  {
    title: 'Clientes',
    url: '/clients',
    icon: UsersRound,
  },
  {
    title: 'Usuários',
    url: '/users',
    icon: Users2Icon,
  },
];

export function AppSidebar() {
  const page = usePage<SharedData>();
  const { auth } = page.props;

  const filteredNavItems =
    auth.user.type === 'metrologist' || auth.user.type === 'production'
      ? mainNavItems.filter((item) => item.url === '/metrology-calls')
      : mainNavItems;

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">Metrol</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={filteredNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
