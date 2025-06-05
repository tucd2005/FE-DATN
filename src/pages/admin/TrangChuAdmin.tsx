import { Table, Card, Row, Col } from "antd";import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const fakeData = [
  { key: '1', name: 'Sản phẩm A', orders: 120, revenue: 3000000 },
  { key: '2', name: 'Sản phẩm B', orders: 80, revenue: 2200000 },
  { key: '3', name: 'Sản phẩm C', orders: 150, revenue: 5000000 },
];

const pieData = [
  { name: 'A', value: 3000000 },
  { name: 'B', value: 2200000 },
  { name: 'C', value: 5000000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const columns = [
  { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
  { title: 'Số đơn hàng', dataIndex: 'orders', key: 'orders' },
  { title: 'Doanh thu (VND)', dataIndex: 'revenue', key: 'revenue' },
];

const TrangChuAdmin = () => {
  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Bảng thống kê đơn hàng" bordered={false}>
            <Table dataSource={fakeData} columns={columns} pagination={false} />
          </Card>
        </Col>

        <Col span={12} className="mt-4">
          <Card title="Biểu đồ tròn – Doanh thu" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12} className="mt-4">
          <Card title="Biểu đồ cột – Số đơn hàng" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fakeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#82ca9d" animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </motion.div>
  );
};

export default TrangChuAdmin;
