import { ChartBarDefault } from '@/components/dashboard/bar-chart';
import { ItemsWaitingForMeasurementPieChart } from '@/components/dashboard/items-waiting-for-measurement-pie-chart';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ClockIcon, ListCheckIcon, PackageSearchIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

interface DashboardProps {
  itemsWaitingForMeasurement: number;
  averageTimeForMeasurement: number;
  itemsMeasuredToday: number;
  itemsWaitingForMeasurementByType: { type: string; total: number; typeId: number }[];
  top5Clients: { label: string; Quantidade: number }[];
  top5CostCenters: { label: string; Quantidade: number }[];
  top5Operations: { label: string; Quantidade: number }[];
}

export default function Dashboard({
  itemsWaitingForMeasurement,
  averageTimeForMeasurement,
  itemsMeasuredToday,
  itemsWaitingForMeasurementByType,
  top5Clients,
  top5CostCenters,
  top5Operations,
}: DashboardProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 rounded-xl px-4 pt-3 pb-3">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardDescription>Quantidade de items esperando por medição</CardDescription>
              <div className="flex justify-between">
                <CardTitle className="text-2xl font-semibold">
                  {itemsWaitingForMeasurement} {itemsWaitingForMeasurement === 1 ? 'unidade' : 'unidades'}
                </CardTitle>
                <PackageSearchIcon />
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Média de tempo gasto para medição</CardDescription>
              <div className="flex justify-between">
                <CardTitle className="text-2xl font-semibold">{averageTimeForMeasurement} min.</CardTitle>
                <ClockIcon />
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Quantidade de items medidos no dia</CardDescription>
              <div className="flex justify-between">
                <CardTitle className="text-2xl font-semibold">{itemsMeasuredToday} unidades</CardTitle>
                <ListCheckIcon />
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-4 pb-0">
          <ChartBarDefault title="Items por cliente" data={top5Clients} type="client" />
          <ChartBarDefault title="Items por centro de custo" data={top5CostCenters} type="costCenter" />
          <ChartBarDefault title="Items por operação" data={top5Operations} type="operation" />
          <ItemsWaitingForMeasurementPieChart data={itemsWaitingForMeasurementByType} />
        </div>
      </div>
    </AppLayout>
  );
}
