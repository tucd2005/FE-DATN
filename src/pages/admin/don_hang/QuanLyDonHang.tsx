import React from 'react';
import { Table, Tag, Button, Space, Popconfirm } from 'antd';

const fakeData = [
  {
    id: 1,
    ma_don: 'ORD123456',
    ten_khach: 'Nguyễn Văn A',
    tong_tien: 1500000,
    trang_thai: 'Đang xử lý',
    ngay_tao: '2024-06-17',
  },
  {
    id: 2,
    ma_don: 'ORD123457',
    ten_khach: 'Trần Thị B',
    tong_tien: 2350000,
    trang_thai: 'Đã xác nhận',
    ngay_tao: '2024-06-16',
  },
  {
    id: 3,
    ma_don: 'ORD123458',
    ten_khach: 'Phạm Văn C',
    tong_tien: 980000,
    trang_thai: 'Đã huỷ',
    ngay_tao: '2024-06-15',
  },
];

const getTrangThaiColor = (trang_thai: string) => {
  switch (trang_thai) {
    case 'Đang xử lý':
      return 'blue';
    case 'Đã xác nhận':
      return 'green';
    case 'Đã giao':
      return 'gold';
    case 'Đã huỷ':
      return 'red';
    default:
      return 'default';
  }
};

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Mã đơn',
    dataIndex: 'ma_don',
    key: 'ma_don',
  },
  {
    title: 'Khách hàng',
    dataIndex: 'ten_khach',
    key: 'ten_khach',
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'tong_tien',
    key: 'tong_tien',
    render: (value: number) => value.toLocaleString() + ' đ',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'trang_thai',
    key: 'trang_thai',
    render: (trang_thai: string) => <Tag color={getTrangThaiColor(trang_thai)}>{trang_thai}</Tag>,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'ngay_tao',
    key: 'ngay_tao',
  },
  {
    title: 'Hành động',
    key: 'actions',
    render: (_: any, record: any) => (
      <Space>
        <Button type="primary" size="small">
          Xem chi tiết
        </Button>
        <Button type="default" size="small">
          Cập nhật
        </Button>
        <Popconfirm title="Bạn có chắc muốn xoá mềm đơn này?">
          <Button danger size="small">Xoá mềm</Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const QuanLyDonHang = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Quản lý đơn hàng</h2>
      <Table columns={columns} dataSource={fakeData} rowKey="id" />
    </div>
  );
};



export default QuanLyDonHang;
