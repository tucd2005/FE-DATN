import React, { useState } from "react";
import { Table, Tag, Space, Button, Tooltip, Spin, Select, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useOrderList, useUpdateOrderStatus } from "../../../hooks/useOrder";

interface Order {
  id: number;
  ma_don_hang: string;
  dia_chi: string;
  trang_thai_thanh_toan: string;
  trang_thai_don_hang: string;
  so_tien_thanh_toan: number;
  created_at: string;
}

// Constant: options cập nhật trạng thái đơn hàng
const ORDER_STATUS_OPTIONS = [
  { value: "cho_xac_nhan", label: "Chờ xác nhận" },
  { value: "dang_chuan_bi", label: "Đang chuẩn bị" },
  { value: "dang_van_chuyen", label: "Đang vận chuyển" },
  { value: "da_giao", label: "Đã giao" },
  { value: "da_huy", label: "Đã huỷ" },
  { value: "tra_hang", label: "Trả hàng" },
];

// Constant: mapping để hiển thị Tag
const ORDER_STATUS_TAG_MAP: Record<string, { color: string; label: string }> = {
  cho_xac_nhan: { color: "orange", label: "Chờ xác nhận" },
  dang_chuan_bi: { color: "purple", label: "Đang chuẩn bị" },
  dang_van_chuyen: { color: "cyan", label: "Đang vận chuyển" },
  da_giao: { color: "green", label: "Đã giao" },
  da_huy: { color: "red", label: "Đã huỷ" },
  tra_hang: { color: "magenta", label: "Trả hàng" },
};

// Constant: mapping trạng thái thanh toán
const PAYMENT_STATUS_MAP: Record<string, { color: string; label: string }> = {
  da_thanh_toan: { color: "green", label: "Đã thanh toán" },
  cho_xu_ly: { color: "orange", label: "Chờ xử lý" },
  that_bai: { color: "red", label: "Thất bại" },
  hoan_tien: { color: "blue", label: "Hoàn tiền" },
  da_huy: { color: "red", label: "Đã huỷ" },
};

const OrderListPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useOrderList(page); 
  const updateStatusMutation = useUpdateOrderStatus();

  


  const handleChangeStatus = (id: number, value: string) => {
    updateStatusMutation.mutate(
      { id, trang_thai_don_hang: value },
      {
        onSuccess: () => message.success("Cập nhật trạng thái thành công"),
        onError: () => message.error("Cập nhật thất bại"),
      }
    );
  };

  const columns = [
    {
      title: "Mã ĐH",
      dataIndex: "ma_don_hang",
    },
    {
      title: "Địa chỉ",
      dataIndex: "dia_chi",
      ellipsis: true,
    },
    {
      title: "Thanh toán",
      dataIndex: "trang_thai_thanh_toan",
      render: (status: string) => {
        const item = PAYMENT_STATUS_MAP[status];
        return item ? <Tag color={item.color}>{item.label}</Tag> : <Tag>{status}</Tag>;
      },
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "trang_thai_don_hang",
      render: (status: string) =>
        ORDER_STATUS_TAG_MAP[status] ? (
          <Tag color={ORDER_STATUS_TAG_MAP[status].color}>{ORDER_STATUS_TAG_MAP[status].label}</Tag>
        ) : (
          <Tag>{status}</Tag>
        ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "so_tien_thanh_toan",
      render: (value: number) =>
        value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Cập nhật trạng thái",
      dataIndex: "update_status",
      render: (_: any, record: Order) => (
        <Select
          size="small"
          value={record.trang_thai_don_hang}
          style={{ width: 140 }}
          onChange={(value) => handleChangeStatus(record.id, value)}
          disabled={updateStatusMutation.isPending}
          options={ORDER_STATUS_OPTIONS}
        />
      ),
    },
    {
      title: "Hành động",
      render: (_: any, record: Order) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/admin/don-hang/${record.id}`)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

 return (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng</h2>
    {isLoading ? (
      <div className="flex justify-center items-center py-8">
        <Spin size="large" />
      </div>
    ) : (
     <Table
  rowKey="id"
  columns={columns}
  dataSource={data?.data || []}
pagination={{
  current: data?.current_page || 1,
  pageSize: data?.per_page || 10,
  total: data?.total || 0,
  onChange: (page) => setPage(page),
  showSizeChanger: false,
}}
/>
    )}
  </div>
);
};

export default OrderListPage;
