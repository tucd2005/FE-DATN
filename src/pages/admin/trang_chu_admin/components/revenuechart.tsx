import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { DualAxes } from '@ant-design/charts';

interface RevenueChartProps {
  data: { date: string; revenue: number }[];
  type?: 'bar' | 'line' | 'dual';
  height?: number;
  colors?: string[]; // Mảng màu
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  type = 'bar',
  height = 300,
  colors = ['#F97316', '#ff7f0e'], // Mặc định cam + cam nhạt
}) => {
  if (type === 'dual') {
    const config = {
      data: [data, data],
      xField: 'date',
      yField: ['revenue'],
      geometryOptions: [
        {
          geometry: 'column',
          color: colors[0], // ✅ dùng màu từ props
          columnWidthRatio: 0.4,
        },
        {
          geometry: 'line',
          color: colors[1] || colors[0], // ✅ fallback nếu không có màu thứ 2
        },
      ],
      tooltip: {
        formatter: (value: number) =>
          `${new Intl.NumberFormat('vi-VN').format(value)} VND`,
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
          <Tooltip
            formatter={(value) =>
              `${new Intl.NumberFormat('vi-VN').format(Number(value))} VND`
            }
          />
          <Legend />
          <Bar dataKey="revenue" fill={colors[0]} name="Doanh thu" /> {/* ✅ */}
        </BarChart>
      ) : (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value) =>
              `${new Intl.NumberFormat('vi-VN').format(Number(value))} VND`
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke={colors[0]} // ✅
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

export default RevenueChart;
