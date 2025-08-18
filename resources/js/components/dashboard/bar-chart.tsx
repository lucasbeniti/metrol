'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {} satisfies ChartConfig;

interface BarChartProps {
  title: string;
  data: { label: string; Quantidade: number }[];
  type: string;
}

const getBarChartFillColorByType = (type: string) => {
  if (type === 'client') {
    return 'var(--chart-1)';
  }

  if (type === 'costCenter') {
    return 'var(--chart-2)';
  }

  return 'var(--chart-3)';
};

export function ChartBarDefault({ title, data, type }: BarChartProps) {
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>5 maiores</CardDescription>
      </CardHeader>
      <CardContent className="h-full flex-1">
        <ChartContainer config={chartConfig} className="h-68 w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel={false} />} />
            <Bar dataKey="Quantidade" fill={getBarChartFillColorByType(type)} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
