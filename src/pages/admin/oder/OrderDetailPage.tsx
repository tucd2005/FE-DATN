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
   
  ];

  if (isLoading) return <Spin size="large" />;



  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Chi tiết đơn hàng: {order?.ma_don_hang}
      </h2>

  <Descriptions
  bordered
  size="small"
  column={1}
  title="Thông tin người đặt hàng"
  className="mb-4"
>
  <Descriptions.Item label="Họ tên">{order?.ten_nguoi_dat}</Descriptions.Item>
  <Descriptions.Item label="SĐT">{order?.sdt_nguoi_dat}</Descriptions.Item>
  <Descriptions.Item label="Email">{order?.email_nguoi_dat}</Descriptions.Item>
</Descriptions>

<Descriptions
  bordered
  size="small"
  column={1}
  title="Địa chỉ giao hàng"
  className="mb-4"
>
  <Descriptions.Item label="Địa chỉ">{order?.dia_chi}</Descriptions.Item>
  <Descriptions.Item label="Địa chỉ đầy đủ">{order?.dia_chi_day_du}</Descriptions.Item>
  <Descriptions.Item label="Tỉnh/Thành phố">{order?.thanh_pho}</Descriptions.Item>
  <Descriptions.Item label="Xã/Phường">{order?.xa}</Descriptions.Item>
</Descriptions>

<Descriptions
  bordered
  size="small"
  column={1}
  title="Thông tin đơn hàng"
  className="mb-4"
>
  <Descriptions.Item label="Mã đơn hàng">{order?.ma_don_hang}</Descriptions.Item>
  <Descriptions.Item label="Tên sản phẩm">{order?.ten_san_pham}</Descriptions.Item>
  <Descriptions.Item label="Giá trị biến thể">{order?.gia_tri_bien_the}</Descriptions.Item>
  <Descriptions.Item label="Phí ship">
    {Number(order?.phi_ship).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })}
  </Descriptions.Item>
  <Descriptions.Item label="Tổng thanh toán">
    {Number(order?.so_tien_thanh_toan).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })}
  </Descriptions.Item>
</Descriptions>

<Descriptions
  bordered
  size="small"
  column={1}
  title="Thanh toán"
  className="mb-4"
>
  <Descriptions.Item label="Trạng thái thanh toán">
    <Tag color={order?.trang_thai_thanh_toan === "da_thanh_toan" ? "green" : "orange"}>
      {order?.trang_thai_thanh_toan?.replace(/_/g, " ")}
    </Tag>
  </Descriptions.Item>

  <Descriptions.Item label="Phương thức thanh toán">{order?.payment_method?.ten}</Descriptions.Item>
</Descriptions>

<Descriptions
  bordered
  size="small"
  column={1}
  title="Giảm giá & Ghi chú"
  className="mb-4"
>
  <Descriptions.Item label="Mã giảm giá">{order?.ma_giam_gia || "Không có"}</Descriptions.Item>
  <Descriptions.Item label="Tiền giảm">
    {Number(order?.so_tien_duoc_giam).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })}
  </Descriptions.Item>
  
</Descriptions>

<Descriptions
  bordered
  size="small"
  column={1}
  title="Trạng thái & Hành động"
  className="mb-4"
>
  <Descriptions.Item label="Trạng thái đơn hàng">
    <Tag color={
      order?.trang_thai_don_hang === "da_nhan"
        ? "green"
        : order?.trang_thai_don_hang === "da_huy"
        ? "red"
        : "orange"
    }>
      {order?.trang_thai_don_hang?.replace(/_/g, " ")}
    </Tag>
  </Descriptions.Item>
  <Descriptions.Item label="Lý do hủy">{order?.ly_do_huy || "-"}</Descriptions.Item>
  <Descriptions.Item label="Lý do trả hàng">{order?.ly_do_tra_hang || "-"}</Descriptions.Item>
  <Descriptions.Item label="Lý do từ chối trả">{order?.ly_do_tu_choi_tra_hang || "-"}</Descriptions.Item>
 {order?.hinh_anh_tra_hang && (
  <Descriptions.Item label="Ảnh trả hàng">
    <Image
      width={100}
      src={`http://localhost:8000/storage/${JSON.parse(order.hinh_anh_tra_hang)[0]}`}
      alt="Ảnh trả hàng"
    />
  </Descriptions.Item>
)}

</Descriptions>

<Descriptions
  bordered
  size="small"
  column={1}
  title="Thông tin thời gian"
  className="mb-4"
>
  <Descriptions.Item label="Ngày tạo">{order?.created_at}</Descriptions.Item>
  <Descriptions.Item label="Ngày cập nhật">{order?.updated_at}</Descriptions.Item>

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
