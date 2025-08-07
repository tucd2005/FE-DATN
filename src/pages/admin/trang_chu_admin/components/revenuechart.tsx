import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DualAxes } from '@ant-design/charts';

interface RevenueChartProps {
  data: { date: string; revenue: number }[];
  type?: 'bar' | 'line' | 'dual';
  height?: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, type = 'bar', height = 300 }) => {
  if (type === 'dual') {
    const config = {
      data: [data, data],
      xField: 'date',
      yField: ['revenue'],
      geometryOptions: [
        {
          geometry: 'column',
          color: '#3f8600',
          columnWidthRatio: 0.4,
        },
        {
          geometry: 'line',
          color: '#ff7f0e',
        },
      ],
      tooltip: {
        formatter: (value: number) => `${new Intl.NumberFormat('vi-VN').format(value)} VND`,
      },
    };
    return <DualAxes {...(config as any)} style={{ height }} />;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      {type === 'bar' ? (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => `${new Intl.NumberFormat('vi-VN').format(Number(value))} VND`} />
          <Legend />
          <Bar dataKey="revenue" fill="#3f8600" name="Doanh thu" />
        </BarChart>
      ) : (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => `${new Intl.NumberFormat('vi-VN').format(Number(value))} VND`} />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#3f8600" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

export default RevenueChart;
