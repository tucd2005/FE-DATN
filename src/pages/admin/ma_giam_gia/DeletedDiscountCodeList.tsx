import React, { useState } from "react";
import { Table, Spin, Alert, Button, Space, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDeletedDiscountCodes, useRestoreDiscountCode } from "../../../hooks/useDiscountCodes";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface DiscountCode {
  id: number;
  ma: string;
  ten: string;
  loai: string;
  gia_tri: number;
  so_luong: number;
  trang_thai: boolean;
  ngay_bat_dau: string;
  ngay_ket_thuc: string;
}

export default function DeletedDiscountCodeList() {
  const [page] = useState(1);
  const { data, isLoading, isError } = useDeletedDiscountCodes(page);
  const { mutate: restore, isPending: isRestoring } = useRestoreDiscountCode();
  const nav = useNavigate();

  const handleBack = () => {
    nav("/admin/ma-giam-gia");
  };

  const handleRestore = (id: number) => {
    restore(id);
  };

  const columns: ColumnsType<DiscountCode> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Mã", dataIndex: "ma", key: "ma" },
    { title: "Tên", dataIndex: "ten", key: "ten" },
    { title: "Loại", dataIndex: "loai", key: "loai" },
    {
      title: "Giá trị",
      dataIndex: "gia_tri",
      key: "gia_tri",
      render: (value, record) =>
        record.loai === "phan_tram" ? `${value}%` : `${value}đ`,
    },
    { title: "Số lượng", dataIndex: "so_luong", key: "so_luong" },
    {
      title: "Ngày bắt đầu",
      dataIndex: "ngay_bat_dau",
      key: "ngay_bat_dau",
      render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "ngay_ket_thuc",
      key: "ngay_ket_thuc",
      render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleRestore(record.id)}
          loading={isRestoring}
        >
          Khôi phục
        </Button>
      ),
    },
  ];

  if (isLoading) return <Spin tip="Đang tải..." />;
  if (isError) return <Alert message="Đã xảy ra lỗi khi tải dữ liệu" type="error" />;

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>Danh sách mã giảm giá đã xóa</h1>
        <Button onClick={handleBack}>Quay lại</Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data?.data || []}
        bordered
      />
    </div>
  );
}
