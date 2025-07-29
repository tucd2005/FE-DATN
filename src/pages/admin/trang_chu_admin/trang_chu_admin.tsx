// src/pages/admin/trang_chu_admin/trang_chu_admin.tsx
import { Card, Statistic, Typography, Tag, List, Avatar, Spin } from "antd";
import { UserOutlined, ShoppingCartOutlined, GiftOutlined } from "@ant-design/icons";
import RevenueChart from "./components/revenuechart";
import { useDashboard } from "../../../hooks/useDashboard"; // đường dẫn có thể cần chỉnh

const { Title, Text } = Typography;

const TrangChuAdmin = () => {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) return <Spin className="w-full h-full flex justify-center items-center" />;
  if (isError || !data) return <div>Không thể tải dữ liệu</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Title level={3}>Bảng điều khiển</Title>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Card>
          <Statistic
            title="Tổng doanh thu"
            prefix="$"
            value={data.tong_doanh_thu}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            suffix={<Text className="text-green-600">{data.ty_le_tang_truong_doanh_thu}%</Text>}
          />
        </Card>

        <Card>
          <Statistic
            title="Người dùng hoạt động"
            value={data.nguoi_dung_hoat_dong}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#3f8600' }}
            suffix={<Text className="text-green-600">{data.ty_le_tang_truong_nguoi_dung}%</Text>}
          />
        </Card>

        <Card>
          <Statistic
            title="Tổng đơn hàng"
            value={data.tong_don_hang}
            prefix={<ShoppingCartOutlined />}
            valueStyle={{ color: '#3f8600' }}
            suffix={<Text className="text-green-600">{data.ty_le_tang_truong_don_hang}%</Text>}
          />
        </Card>

        <Card>
          <Statistic
            title="Sản phẩm đã bán"
            value={+data.san_pham_da_ban}
            prefix={<GiftOutlined />}
            valueStyle={{ color: '#cf1322' }}
            suffix={<Text className="text-red-600">{data.ty_le_tang_truong_san_pham}%</Text>}
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card title="Tổng quan doanh thu">
          <RevenueChart data={data.doanh_thu_theo_thang} />
        </Card>

        <Card title="Hoạt động gần đây">
          <List
            itemLayout="horizontal"
            dataSource={data.hoat_dong_gan_day ?? []}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={<Text strong>{item.name}</Text>}
                  description={
                    <>
                      <Text>{item.action}</Text>
                      <br />
                      <Text type="secondary">{item.time}</Text>
                    </>
                  }
                />
                <Tag
                  color={
                    item.status === "success"
                      ? "green"
                      : item.status === "info"
                      ? "blue"
                      : item.status === "warning"
                      ? "gold"
                      : "red"
                  }
                >
                  {item.status === "success"
                    ? "thành công"
                    : item.status === "info"
                    ? "thông tin"
                    : item.status === "warning"
                    ? "cảnh báo"
                    : "lỗi"}
                </Tag>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default TrangChuAdmin;
