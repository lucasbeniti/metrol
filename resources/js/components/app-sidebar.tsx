import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Handshake, LayoutGrid, MonitorCog, PackageSearch, Ruler, Theater, Users2Icon, UsersRound } from 'lucide-react';

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
    title: 'Peça',
    url: '/items',
    icon: PackageSearch,
  },
  {
    title: 'Máquinas',
    url: '/machines',
    icon: MonitorCog,
  },
  {
    title: 'Operações',
    url: '/operations',
    icon: Handshake,
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
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                Metrol
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
