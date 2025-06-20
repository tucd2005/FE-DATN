import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import React from 'react';

const fakeData = [
  {
    id: 1,
    ten: 'Đỏ',
    ma_mau: '#FF0000',
    mo_ta: 'Màu đỏ tươi',
    ngay_tao: '2024-06-01',
    ngay_cap_nhat: '2024-06-03',
    trang_thai: 'Đang hoạt động',
  },
  {
    id: 2,
    ten: 'Xanh dương',
    ma_mau: '#0000FF',
    mo_ta: 'Màu xanh biển',
    ngay_tao: '2024-06-01',
    ngay_cap_nhat: '2024-06-03',
    trang_thai: 'Tạm ngừng',
  },
  {
    id: 3,
    ten: 'Vàng',
    ma_mau: '#FFD700',
    mo_ta: 'Màu vàng chanh',
    ngay_tao: '2024-06-01',
    ngay_cap_nhat: '2024-06-04',
    trang_thai: 'Đang hoạt động',
  },
];

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Tên', dataIndex: 'ten', key: 'ten' },
  { title: 'Mã màu', dataIndex: 'ma_mau', key: 'ma_mau', render: (color: string) => (
    <Tag color={color}>{color}</Tag>
  )},
  { title: 'Mô tả', dataIndex: 'mo_ta', key: 'mo_ta' },
  { title: 'Ngày tạo', dataIndex: 'ngay_tao', key: 'ngay_tao' },
  { title: 'Ngày cập nhật', dataIndex: 'ngay_cap_nhat', key: 'ngay_cap_nhat' },
  {
    title: 'Trạng thái',
    dataIndex: 'trang_thai',
    key: 'trang_thai',
    render: (trang_thai: string) =>
      trang_thai === 'Đang hoạt động' ? (
        <Tag color="green">Đang hoạt động</Tag>
      ) : (
        <Tag color="red">Tạm ngừng</Tag>
      ),
  },
  {
    title: 'Hành động',
    key: 'actions',
    render: (_: any) => (
      <Space>
        {/* Có thể thêm nút Sửa ở đây */}
        <Popconfirm title="Bạn có chắc muốn xoá?">
          <Button danger>Xoá mềm</Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const QuanLyMauSac = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2 className="text-2xl font-semibold">Quản lý màu sắc</h2>

      <div className="flex justify-end p-3">
        <Button type="primary">Thêm màu sắc</Button>
      </div>

      <Table columns={columns} dataSource={fakeData} rowKey="id" />
    </div>
  );
};

export default QuanLyMauSac;
