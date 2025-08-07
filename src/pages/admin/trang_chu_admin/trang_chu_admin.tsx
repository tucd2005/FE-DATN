import { Card, Statistic, Typography, List, Avatar, Spin, Row, Col } from 'antd';
import {  ShoppingCartOutlined, GiftOutlined } from '@ant-design/icons';
import { useDashboard } from '../../../hooks/useDashboard';
import { User } from 'lucide-react';
import RevenueChart from './components/revenuechart';


const { Title, Text } = Typography;

const TrangChuAdmin = () => {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) return <Spin className="w-full h-full flex justify-center items-center" />;
  if (isError || !data) return <div>Không thể tải dữ liệu</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Title level={3}>Bảng điều khiển</Title>

      {/* Phần tổng quan */}
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={data.tong_doanh_thu}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              formatter={(value) => `${new Intl.NumberFormat('vi-VN').format(Number(value))} VND`}
             
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Người dùng"
              value={data.nguoi_dung_hoat_dong}
              prefix={<User Outlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng đơn hàng"
              value={data.tong_don_hang}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Sản phẩm đã bán"
              value={+data.san_pham_da_ban}
              prefix={<GiftOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Nhóm biểu đồ 1 */}
      <Row gutter={16} className="mb-6">
        <Col span={12}>
          <Card title="Doanh Thu Theo Tháng">
            <RevenueChart 
              data={data.doanh_thu_theo_thang.map(item => ({ date: item.month, revenue: item.revenue }))} 
              type="bar"
              height={400}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Doanh Thu Theo Ngày (Tháng 8)">
            <RevenueChart 
              data={data.doanh_thu_theo_ngay.map(item => ({ date: item.date, revenue: item.revenue }))} 
              type="bar" // Hoặc 'bar' tùy theo sở thích
              height={400}
            />
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ năm */}
      <Card title="Doanh Thu Theo Năm" className="mb-6">
        <RevenueChart 
          data={data.doanh_thu_theo_nam.map(item => ({ date: item.year.toString(), revenue: item.revenue }))} 
          type="line"
          height={400}
        />
      </Card>

      {/* Sản phẩm bán chạy */}
      <Card title="Sản Phẩm Bán Chạy">
        <List
          dataSource={data.san_pham_ban_chay}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<GiftOutlined />} />}
                title={item.ten_san_pham}
                description={`Đã bán: ${item.so_luong_da_ban} sản phẩm`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default TrangChuAdmin;
