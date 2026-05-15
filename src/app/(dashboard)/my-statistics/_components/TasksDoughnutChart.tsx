
'use client';

import { StatusTotals } from '@/lib/types/statistics';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from './_ui/Card';


Chart.register(...registerables);

interface TasksDoughnutChartProps {
  totals: StatusTotals;
}

const STATUS_COLORS: Record<string, string> = {
  TO_DO: '#EF4444',
  IN_PROGRESS: '#003D9B',
  BLOCKED: '#BA1A1A',
  IN_REVIEW: '#8B5CF6',
  READY_FOR_QA: '#10B981',
  REOPENED: '#EC4899',
  READY_FOR_PRODUCTION: '#14B8A6',
  DONE: '#004E32',
};


export function TasksDoughnutChart({ totals }: TasksDoughnutChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const labels = Object.keys(totals).filter(
      (key) => totals[key as keyof StatusTotals] > 0
    );
    const data = labels.map((label) => totals[label as keyof StatusTotals]);
    const backgroundColors = labels.map((label) => STATUS_COLORS[label]);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        labels: labels.map(label => label.replace(/_/g, ' ')),
        datasets: [
          {
            data,
            backgroundColor: backgroundColors,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 10,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [totals]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-xs mx-auto">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
}