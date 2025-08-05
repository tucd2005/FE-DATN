import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RevenueItem {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueItem[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  // Xử lý loại bỏ tháng trùng
  const uniqueData = Array.from(
    new Map(data.map((item) => [item.month, item])).values()
  );

  const chartData = {
    labels: uniqueData.map((item) => item.month),
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: uniqueData.map((item) => item.revenue),
        backgroundColor: "rgba(59, 130, 246, 0.7)", // blue-500 opacity
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "📊 Doanh thu 6 tháng gần nhất",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.dataset.label}: ${context.raw.toLocaleString("vi-VN")} đ`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: any) => `${value.toLocaleString("vi-VN")} đ`,
        },
        title: {
          display: true,
          text: "Doanh thu (VNĐ)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Tháng",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default RevenueChart;
