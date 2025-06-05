

import React from "react";
import { Table, Button, Tag, Switch, Space } from "antd";

const data = [
  {
    key: "1",
    tenVoucher: "Giảm 40%",
    maVoucher: "VOUCHER40",
    giamPhanTram: 40,
    giamToiDa: 20000,
    soLuong: 50,
    trangThai: "Hết hạn",
    hoatDong: true,
    moTa: "Giảm giá 40% cho đơn hàng từ 100K",
    ngayBatDau: "31/03/2025",
    ngayKetThuc: "01/04/2025",
    ngayTao: "31/03/2025",
    ngaySua: "03/04/2025",
  },
];

const QuanLyMaGiamGia = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>DANH SÁCH MÃ GIẢM GIÁ</h2>
      <Button type="primary" style={{ marginBottom: 16 }}>
        + Thêm mã giảm giá
      </Button>

      <Table
        dataSource={data}
        pagination={{ pageSize: 5 }}
        columns={[
          {
            title: "#",
            dataIndex: "key",
            key: "key",
          },
          {
            title: "Tên voucher",
            dataIndex: "tenVoucher",
            key: "tenVoucher",
          },
          {
            title: "Mã voucher",
            dataIndex: "maVoucher",
            key: "maVoucher",
          },
          {
            title: "Giá trị giảm (%)",
            dataIndex: "giamPhanTram",
            key: "giamPhanTram",
          },
          {
            title: "Giảm tối đa (VNĐ)",
            dataIndex: "giamToiDa",
            key: "giamToiDa",
          },
          {
            title: "Số lượng",
            dataIndex: "soLuong",
            key: "soLuong",
          },
          {
            title: "Trạng thái",
            dataIndex: "trangThai",
            key: "trangThai",
            render: (text) => (
              <Tag color={text === "Hết hạn" ? "red" : "green"}>{text}</Tag>
            ),
          },
          {
            title: "Trạng thái hoạt động",
            dataIndex: "hoatDong",
            key: "hoatDong",
            render: (active) => <Switch defaultChecked={active} />,
          },
          {
            title: "Mô tả",
            dataIndex: "moTa",
            key: "moTa",
          },
          {
            title: "Ngày bắt đầu",
            dataIndex: "ngayBatDau",
            key: "ngayBatDau",
          },
          {
            title: "Ngày kết thúc",
            dataIndex: "ngayKetThuc",
            key: "ngayKetThuc",
          },
          {
            title: "Ngày tạo",
            dataIndex: "ngayTao",
            key: "ngayTao",
          },
          {
            title: "Ngày sửa",
            dataIndex: "ngaySua",
            key: "ngaySua",
          },
          {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
              <Space>
                <Button type="link">Sửa</Button>
                <Button type="link" danger>
                  Xoá
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
};

export default QuanLyMaGiamGia;
