import React from "react";
import { useParams } from "react-router-dom";
import { Spin, Descriptions, Table, Tag, Image, Space } from "antd";
import { useOrderDetail } from "../../../hooks/useOrder";

// Định nghĩa kiểu dữ liệu cho order detail
interface Product {
  ten?: string;
  hinh_anh?: string;
}
interface Variant {
  hinh_anh?: string;
}
interface OrderDetailRow {
  id: number;
  product?: Product;
  variant?: Variant;
  thuoc_tinh_bien_the?: string | null;
  so_luong: number;
  don_gia: string;
  tong_tien: string;
}

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useOrderDetail(Number(id));

 
  
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product",
      render: (product: Product | undefined) => product?.ten || "Không rõ",
    },
    {
      title: "Hình ảnh",
      dataIndex: "variant",
      render: (_: Variant | undefined, record: OrderDetailRow) => {
        const variantImage = record.variant?.hinh_anh;
        const productImage = record.product?.hinh_anh;
        let img: string | undefined = variantImage || productImage || "no-image.png";
    
        // Nếu backend trả object thay vì string, lấy trường 'url'
        if (typeof img === "object" && img !== null && Object.prototype.hasOwnProperty.call(img, 'url')) {
          img = (img as { url: string }).url;
        }
    
        // Nếu img là chuỗi JSON mảng => parse và lấy phần tử đầu
        if (typeof img === "string" && img.startsWith("[")) {
          try {
            const arr = JSON.parse(img);
            img = arr[0] ?? "no-image.png";
          } catch {
            img = "no-image.png";
          }
        }
    
        // ép img thành string, rồi mới gọi startsWith
        const safeImg = String(img ?? "");
    
        const fullUrl = safeImg.startsWith("http")
          ? safeImg
          : `http://localhost:8000/storage/${safeImg}`;
    
        return (
          <Image
            width={60}
            src={fullUrl}
            alt={record.product?.ten || "Ảnh sản phẩm"}
            fallback="/no-image.png"
          />
        );
      },
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
              {attrs.map((attr: { thuoc_tinh: string; gia_tri: string }, idx: number) => {
                let label = attr.thuoc_tinh;
                const value = attr.gia_tri;
    
                // Tự động gán nhãn nếu "Không rõ"
                if (label === "Không rõ") {
                  if (["S", "M", "L", "XL", "XXL"].includes(value)) {
                    label = "Size";
                  } else if (
                    ["Đỏ", "Xanh", "Vàng", "Đen", "Trắng"].includes(value)
                  ) {
                    label = "Màu sắc";
                  }
                }
    
                // Nếu là mã màu hex thì chỉ hiện ô màu, bỏ chữ
                if (
                  typeof value === "string" &&
                  value.startsWith("#") &&
                  (value.length === 4 || value.length === 7)
                ) {
                  return (
                    <Tag
                      key={idx}
                      style={{
                        backgroundColor: value,
                        width: 24,
                        height: 24,
                        padding: 0,
                        borderRadius: 4,
                        border: "1px solid #ccc",
                      }}
                    />
                  );
                }
    
                // Mặc định hiển thị label: value
                return <Tag key={idx}>{`${label}: ${value}`}</Tag>;
              })}
            </Space>
          );
        } catch {
          return "-";
        }
      },
    },
    {
      title: "Số lượng",
      dataIndex: "so_luong",
    },
    {
      title: "Đơn giá",
      dataIndex: "don_gia",
      render: (val: string) =>
        Number(val).toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Tổng tiền",
      dataIndex: "tong_tien",
      render: (val: string) =>
        Number(val).toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
  ];

  if (isLoading) return <Spin size="large" />;

  console.log("order data:", order);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Chi tiết đơn hàng: {order?.ma_don_hang}
      </h2>

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
        <Descriptions.Item label="Trạng thái đơn hàng">
           {(() => {
             const status = order?.trang_thai_don_hang;
             let color: string = 'geekblue';
             if (["da_nhan", "tra_hang_thanh_cong"].includes(status)) color = 'green';
             else if (["da_huy"].includes(status)) color = 'red';
             else if (["yeu_cau_tra_hang", "cho_xac_nhan_tra_hang", "da_giao", "dang_van_chuyen", "cho_xac_nhan", "dang_chuan_bi"].includes(status)) color = 'orange';
             return <Tag color={color}>{status?.replace(/_/g, ' ')}</Tag>;
           })()}
        </Descriptions.Item>
        {order?.ly_do_tra_hang && (
          <Descriptions.Item label="Lý do trả hàng">
            <span style={{ color: '#d48806', fontWeight: 500 }}>{order.ly_do_tra_hang}</span>
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Tổng tiền">
          {order?.so_tien_thanh_toan?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </Descriptions.Item>
      </Descriptions>

      <h3 className="mt-6 mb-2 font-semibold">Danh sách sản phẩm</h3>
      <Table
        rowKey="id"
        dataSource={order?.order_detail as OrderDetailRow[] || []}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default OrderDetailPage;
