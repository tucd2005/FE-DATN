import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
  datasets: [
    {
      label: 'Doanh thu',
      data: [12000, 19000, 3000, 5000, 20000, 30000],
      fill: false,
      backgroundColor: 'rgb(59, 130, 246)',
      borderColor: 'rgba(59, 130, 246, 0.5)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Doanh thu trong 6 tháng gần nhất',
    },
  },
};

const RevenueChart = () => {
  return <Line options={options} data={data} />;
};

export default RevenueChart;
