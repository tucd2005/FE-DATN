import { Card, Statistic, Typography, List, Avatar, Spin, Row, Col, Progress } from 'antd';
import { ShoppingCartOutlined, GiftOutlined } from '@ant-design/icons';
import { useDashboard } from '../../../hooks/useDashboard';
import { User } from 'lucide-react';
import RevenueChart from './components/revenuechart';
export interface RevenueChartProps {
  data: { date: string; revenue: number }[];
  type: 'bar' | 'line';
  height?: number;
  colors?: string[]; // ✅ thêm dòng này
}
const { Title } = Typography;

const TrangChuAdmin = () => {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) return <Spin className="w-full h-full flex justify-center items-center" />;
  if (isError || !data) return <div>Không thể tải dữ liệu</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Title level={3} style={{ marginBottom: 24 }}>Bảng điều khiển</Title>

      {/* Phần tổng quan */}
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card className="rounded-xl shadow-sm">
            <Statistic
              title="Tổng doanh thu"
              value={data.tong_doanh_thu}
              precision={0}
              valueStyle={{ color: '#22C55E', fontWeight: 'bold' }}
              formatter={(value) =>
                `${new Intl.NumberFormat('vi-VN').format(Number(value))} VND`
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="rounded-xl shadow-sm">
            <Statistic
              title="Người dùng"
              value={data.nguoi_dung_hoat_dong}
              prefix={<User size={18} />}
              valueStyle={{ color: '#3B82F6', fontWeight: 'bold' }}
              formatter={(value) => `${Number(value)} người`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="rounded-xl shadow-sm">
            <Statistic
              title="Tổng đơn hàng"
              value={data.tong_don_hang}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#F59E0B', fontWeight: 'bold' }}
              formatter={(value) => `${Number(value)} đơn`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="rounded-xl shadow-sm">
            <Statistic
              title="Sản phẩm đã bán"
              value={+data.san_pham_da_ban}
              prefix={<GiftOutlined />}
              valueStyle={{ color: '#EC4899', fontWeight: 'bold' }}
              formatter={(value) => `${Number(value)} sản phẩm`}
            />
          </Card>
        </Col>
      </Row>

      {/* Nhóm biểu đồ 1 */}
      <Row gutter={16} className="mb-6">
        <Col span={12}>
          <Card
            title={<span style={{ fontWeight: 600 }}>Doanh Thu Theo Tháng</span>}
            className="rounded-xl shadow-sm"
          >
            <RevenueChart
              data={data.doanh_thu_theo_thang.map((item) => ({
                date: item.month,
                revenue: item.revenue,
              }))}
              type="bar"
              height={400}
              colors={['#3B82F6', '#22C55E']} // gradient xanh dương → xanh lá
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={<span style={{ fontWeight: 600 }}>Doanh Thu Theo Ngày (Tháng 8)</span>}
            className="rounded-xl shadow-sm"
          >
            <RevenueChart
              data={data.doanh_thu_theo_ngay.map((item) => ({
                date: item.date,
                revenue: item.revenue,
              }))}
              type="bar"
              height={400}
              colors={['#F97316', '#FCD34D']} // gradient cam → vàng
            />
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ năm */}
      <Card
        title={<span style={{ fontWeight: 600 }}>Doanh Thu Theo Năm</span>}
        className="rounded-xl shadow-sm mb-6"
      >
        <RevenueChart
          data={data.doanh_thu_theo_nam.map((item) => ({
            date: item.year.toString(),
            revenue: item.revenue,
          }))}
          type="line"
          height={400}
          colors={['#6366F1']} // tím indigo
        />
      </Card>

      {/* Sản phẩm bán chạy */}
      <Card
  title={<span style={{ fontWeight: 600 }}>🔥 Sản Phẩm Bán Chạy</span>}
  className="rounded-xl shadow-md"
>
  <List
    dataSource={data.san_pham_ban_chay}
    renderItem={(item) => (
      <List.Item className="hover:bg-gray-50 rounded-lg p-2 transition">
        <List.Item.Meta
          avatar={
            <Avatar
              icon={<GiftOutlined />}
              style={{ backgroundColor: '#EC4899' }}
            />
          }
          title={
            <span className="font-medium">{item.ten_san_pham}</span>
          }
          description={
            <div>
              <div className="text-sm text-gray-500 mb-1">
                Đã bán: {item.so_luong_da_ban} sản phẩm
              </div>
              <Progress
                percent={Math.min(item.so_luong_da_ban, 100)} // ví dụ
                size="small"
                showInfo={false}
                strokeColor="#EC4899"
              />
            </div>
          }
        />
      </List.Item>
    )}
  />
</Card>

    </div>
  );
};

export default TrangChuAdmin;
