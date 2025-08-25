'use client';

import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { getColorFromMetrologyCallTypeForChart } from '@/utils/metrology_calls';

const chartConfig = {} satisfies ChartConfig;

interface ItemsWaitingForMeasurementPieChartProps {
  data: { type: string; total: number; typeId: number }[];
}

export function ItemsWaitingForMeasurementPieChart({ data }: ItemsWaitingForMeasurementPieChartProps) {
  const chartData = data.map((item) => ({
    type: item.type,
    quantity: item.total,
    fill: getColorFromMetrologyCallTypeForChart(item.typeId),
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">Quantidade de itens esperando por medição</CardTitle>
        <CardDescription>Distribuição por tipo</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="quantity" label nameKey="type" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-sm">
        <div className="flex justify-around gap-2">
          {chartData.map((item) => (
            <div key={item.type} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-lg" style={{ backgroundColor: item.fill }} />
              <span>{item.type}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
