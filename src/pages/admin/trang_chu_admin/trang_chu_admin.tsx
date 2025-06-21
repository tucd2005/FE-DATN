import { Card, Statistic, Typography, Tag, List, Avatar } from "antd";
import { UserOutlined, ShoppingCartOutlined, GiftOutlined } from "@ant-design/icons";
import RevenueChart from "./components/revenuechart";


const { Title, Text } = Typography;

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Title level={3}>Bảng điều khiển</Title>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Card>
          <Statistic
            title="Tổng doanh thu"
            prefix="$"
            value={45231.89}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            suffix={<Text className="text-green-600">+20.1% so với tháng trước</Text>}
          />
        </Card>

        <Card>
          <Statistic
            title="Người dùng hoạt động"
            value={2350}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#3f8600' }}
            suffix={<Text className="text-green-600">+180.1% so với tháng trước</Text>}
          />
        </Card>

        <Card>
          <Statistic
            title="Tổng đơn hàng"
            value={12234}
            prefix={<ShoppingCartOutlined />}
            valueStyle={{ color: '#3f8600' }}
            suffix={<Text className="text-green-600">+19% so với tháng trước</Text>}
          />
        </Card>

        <Card>
          <Statistic
            title="Sản phẩm đã bán"
            value={573}
            prefix={<GiftOutlined />}
            valueStyle={{ color: '#cf1322' }}
            suffix={<Text className="text-red-600">-4.3% so với tháng trước</Text>}
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Tổng quan doanh thu">
          <RevenueChart />
        </Card>

        <Card title="Hoạt động gần đây">
          <List
            itemLayout="horizontal"
            dataSource={[
              { name: 'John Doe', action: 'Tạo đơn hàng mới', time: '2 phút trước', status: 'success' },
              { name: 'Jane Smith', action: 'Cập nhật tồn kho sản phẩm', time: '5 phút trước', status: 'info' },
              { name: 'Mike Johnson', action: 'Huỷ đăng ký', time: '10 phút trước', status: 'warning' },
              { name: 'Sarah Wilson', action: 'Thanh toán thành công', time: '15 phút trước', status: 'success' },
              { name: 'Tom Brown', action: 'Đăng nhập thất bại', time: '20 phút trước', status: 'error' },
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={<Text strong>{item.name}</Text>}
                  description={<>
                    <Text>{item.action}</Text>
                    <br />
                    <Text type="secondary">{item.time}</Text>
                  </>}
                />
                <Tag color={
                  item.status === 'success' ? 'green' :
                  item.status === 'info' ? 'blue' :
                  item.status === 'warning' ? 'gold' : 'red'}
                >
                  {item.status === 'success' ? 'thành công' :
                  item.status === 'info' ? 'thông tin' :
                  item.status === 'warning' ? 'cảnh báo' : 'lỗi'}
                </Tag>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;