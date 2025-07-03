import React from "react";
import { useParams } from "react-router-dom";
import { Spin, Descriptions, Table, Tag, Image, Space } from "antd";
import { useOrderDetail } from "../../../hooks/useOrder";


const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useOrderDetail(Number(id));

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product",
      render: (product: any) => product?.ten || "Không rõ"
    },
    {
      title: "Hình ảnh",
      dataIndex: "variant",
      render: (_: any, record: any) => {
        // Lấy ảnh từ biến thể, nếu không có thì lấy ảnh sản phẩm, nếu không có thì dùng ảnh mặc định
        const img = record.variant?.hinh_anh?.[0] || record.product?.hinh_anh || "no-image.png";
    
        // Nếu img đã bắt đầu bằng http, dùng trực tiếp; ngược lại thêm prefix server
        const fullUrl = img.startsWith("http")
          ? img
          : `http://localhost:8000/storage/${img}`;
    
        return <Image width={60} src={fullUrl} alt={record.product?.ten} />;
      }
    },
    {
      title: "Biến thể",
      dataIndex: "thuoc_tinh_bien_the",
      render: (json: string | null) => {
        if (!json || json === "null") return "-";
        try {
          const attrs = JSON.parse(json);
          if (!Array.isArray(attrs) || attrs.length === 0) return "-";
    
          return (
            <Space wrap>
              {attrs.map((attr: any, idx: number) => {
                let label = attr.thuoc_tinh;
                // Tạm: nếu backend để "Không rõ", dựa vào giá trị để đoán
                if (label === "Không rõ") {
                  if (["S", "M", "L", "XL", "XXL"].includes(attr.gia_tri)) {
                    label = "Size";
                  } else if (["Đỏ", "Xanh", "Vàng", "Đen", "Trắng"].includes(attr.gia_tri)) {
                    label = "Màu sắc";
                  }
                }
                return <Tag key={idx}>{`${label}: ${attr.gia_tri}`}</Tag>;
              })}
            </Space>
          );
        } catch {
          return "-";
        }
      }
    },
    
    {
      title: "Số lượng",
      dataIndex: "so_luong"
    },
    {
      title: "Đơn giá",
      dataIndex: "don_gia",
      render: (val: string) =>
        Number(val).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    },
    {
      title: "Tổng tiền",
      dataIndex: "tong_tien",
      render: (val: string) =>
        Number(val).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    }
  ];

  if (isLoading) return <Spin size="large" />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng: {order?.ma_don_hang}</h2>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="Mã Đơn Hàng">{order?.ma_don_hang}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">{order?.dia_chi}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái thanh toán">
          {order?.trang_thai_thanh_toan === "da_thanh_toan" ? (
            <Tag color="green">Đã thanh toán</Tag>
          ) : (
            <Tag color="orange">Chờ xử lý</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Phương thức thanh toán">
          {order?.payment_method?.ten}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái đơn hàng">{order?.trang_thai_don_hang}</Descriptions.Item>
        <Descriptions.Item label="Tổng tiền">
          {order?.so_tien_thanh_toan?.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
        </Descriptions.Item>
      </Descriptions>

      <h3 className="mt-6 mb-2 font-semibold">Danh sách sản phẩm</h3>
      <Table
        rowKey="id"
        dataSource={order?.order_detail || []}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default OrderDetailPage;
