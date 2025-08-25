import { type NavItem } from '@/types';
import { ChartNoAxesCombined, LayoutGrid, Logs, MonitorCog, PackageSearch, Ruler, Theater, Users2Icon, UsersRound } from 'lucide-react';

export const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Logs',
    url: '/logs',
    icon: Logs,
  },
  {
    title: 'Relatórios',
    url: '/reports',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'Usuários',
    url: '/users',
    icon: Users2Icon,
  },
  {
    title: 'Clientes',
    url: '/clients',
    icon: UsersRound,
  },
  {
    title: 'Centros de Custo',
    url: '/cost-centers',
    icon: Theater,
  },
  {
    title: 'Itens',
    url: '/items',
    icon: PackageSearch,
  },
  {
    title: 'Máquinas',
    url: '/machines',
    icon: MonitorCog,
  },
  {
    title: 'Chamados',
    url: '/metrology-calls',
    icon: Ruler,
  },
];
