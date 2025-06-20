import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import React from 'react';

const fakeData = [
  {
    id: 1,
    ten: 'Size S',
    mo_ta: 'Kích thước nhỏ',
    slug: 'size-s',
    ngay_tao: '2024-06-01',
    ngay_cap_nhat: '2024-06-03',
    trang_thai: 'Đang hoạt động',
  },
  {
    id: 2,
    ten: 'Size M',
    mo_ta: 'Kích thước trung bình',
    slug: 'size-m',
    ngay_tao: '2024-06-01',
    ngay_cap_nhat: '2024-06-03',
    trang_thai: 'Đang hoạt động',
  },
  {
    id: 3,
    ten: 'Size L',
    mo_ta: 'Kích thước lớn',
    slug: 'size-l',
    ngay_tao: '2024-06-01',
    ngay_cap_nhat: '2024-06-04',
    trang_thai: 'Tạm ngừng',
  },
];

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Tên', dataIndex: 'ten', key: 'ten' },
  { title: 'Mô tả', dataIndex: 'mo_ta', key: 'mo_ta' },

  { title: 'Ngày tạo', dataIndex: 'ngay_tao', key: 'ngay_tao' },
  { title: 'Ngày cập nhật', dataIndex: 'ngay_cap_nhat', key: 'ngay_cap_nhat' },
  {
    title: 'Trạng thái',
    dataIndex: 'trang_thai',
    key: 'trang_thai',
    render: (trang_thai:string) =>
      trang_thai === 'Đang hoạt động' ? (
        <Tag color="green">Đang hoạt động</Tag>
      ) : (
        <Tag color="red">Tạm ngừng</Tag>
      ),
  },
  {
    title: 'Hành động',
    key: 'actions',
    render: (_: any,) => (
      <Space>
        {/* Có thể thêm nút Sửa ở đây */}
        <Popconfirm title="Bạn có chắc muốn xoá?" >
          <Button danger>Xoá mềm </Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const QuanLyKichThuoc = () => {
  return (
    <div style={{ padding: 20 }}>
      
      <h2 className="text-2xl font-semibold">Quản lý kích thước</h2>

      <div className="flex justify-end p-3">
        <Button type="primary" >
          Thêm danh mục
        </Button>
      </div>

      <Table columns={columns} dataSource={fakeData} rowKey="id" />
    </div>
  );
};

export default QuanLyKichThuoc;
