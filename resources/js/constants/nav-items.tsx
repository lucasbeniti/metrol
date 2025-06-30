import { type NavItem } from '@/types';
import { LayoutGrid, MonitorCog, PackageSearch, Ruler, Theater, Users2Icon, UsersRound } from 'lucide-react';

export const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutGrid,
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
    title: 'Peças',
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
