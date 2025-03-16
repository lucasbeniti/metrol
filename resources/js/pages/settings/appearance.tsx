import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Configurações',
    href: '/settings/appearance',
  },
];

export default function Appearance() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Configurações" />

      <div className="space-y-6 p-6">
        <HeadingSmall title="Configurações de tema" description="Altere o tema do Metrol" />
        <AppearanceTabs />
      </div>
    </AppLayout>
  );
}
