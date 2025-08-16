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
}

export default function Dashboard({ itemsWaitingForMeasurement, averageTimeForMeasurement, itemsMeasuredToday }: DashboardProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
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

        <div className="grid flex-1 grid-cols-2 gap-4">
          <Card className="h-full"></Card>

          <Card className="h-full"></Card>

          <Card className="h-full"></Card>

          <Card className="h-full"></Card>
        </div>
      </div>
    </AppLayout>
  );
}
