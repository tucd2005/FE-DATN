import React, { useState } from "react";
import { Table, Tag, Spin, Alert, Button, Space, Switch } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDiscountCodes, useSoftDeleteDiscountCode, useUpdateDiscountCodeStatus } from "../../../hooks/useDiscountCodes";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

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

export default function DiscountCodeList() {
  const [page] = useState(1);
  const { data, isLoading: isFetching, isError } = useDiscountCodes(page);
  const nav = useNavigate();

  const { mutate: toggleStatus, isPending: isToggling } = useUpdateDiscountCodeStatus();
  const { mutate: softDelete, isPending: isDeleting } = useSoftDeleteDiscountCode();

  const handleAdd = () => {
    nav("/admin/ma-giam-gia/add");
  };

  const handleEdit = (item: DiscountCode) => {
    nav(`/admin/ma-giam-gia/edit/${item.id}`);
  };

  const handleViewDeleted = () => {
    nav("/admin/ma-giam-gia/list/delete");
  };

  const handleToggleStatus = (item: DiscountCode) => {
    toggleStatus({ id: item.id, status: !item.trang_thai });
  };

  const handleDelete = (item: DiscountCode) => {
    softDelete(item.id);
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
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      render: (active) =>
        active ? <Tag color="green">Đang áp dụng</Tag> : <Tag color="red">Ngưng</Tag>,
    },
    {
      title: "Bật/Tắt",
      key: "toggle",
      render: (_, record) => (
        <Switch
          checked={record.trang_thai}
          onChange={() => handleToggleStatus(record)}
          checkedChildren="Bật"
          unCheckedChildren="Tắt"
        />
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button
            size="small"
            danger
            onClick={() => handleDelete(record)}
            loading={isDeleting}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  if (isFetching) return <Spin tip="Đang tải..." />;
  if (isError) return <Alert message="Đã xảy ra lỗi khi tải dữ liệu" type="error" />;

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>Danh sách mã giảm giá</h1>
        <Space>
          <Button type="primary" onClick={handleAdd}>Thêm</Button>
          <Button onClick={handleViewDeleted}>Đã xoá mềm</Button>
        </Space>
      </div>
      <Table
        loading={isToggling || isDeleting || isFetching}
        rowKey="id"
        columns={columns}
        dataSource={data?.data || []}
        bordered
      />
    </div>
  );
}
