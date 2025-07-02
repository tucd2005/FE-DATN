import React, { useState } from 'react';
import { Button, Form, Input, Modal, Space, Table, Image, Popconfirm } from 'antd';
import AddBanner from './AddBanner';

interface BannerType {
  key: string;
  tieu_de: string;
  mo_ta?: string;
  hinh_anh: string;
  lien_ket?: string;
}

const initialBanners: BannerType[] = [
  {
    key: '1',
    tieu_de: 'Khuyến mãi mùa hè',
    mo_ta: 'Giảm giá cực sốc lên đến 50%',
    hinh_anh: 'https://d3design.vn/uploads/summer_212_01.jpg',
    lien_ket: 'https://example.com/promo',
  },
  {
    key: '2',
    tieu_de: 'Sản phẩm mới ra mắt',
    mo_ta: 'Khám phá ngay sản phẩm hot',
    hinh_anh: 'https://d3design.vn/uploads/Anh_bia_summer_sale_holiday_podium_display_on_yellow_background.jpg',
    lien_ket: 'https://example.com/new',
  },
];

const QuanLyBanner: React.FC = () => {
  const [banners, setBanners] = useState<BannerType[]>(initialBanners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const newBanner: BannerType = {
        key: Date.now().toString(),
        tieu_de: values.tieu_de,
        mo_ta: values.mo_ta,
        hinh_anh: values.hinh_anh,
        lien_ket: values.lien_ket,
      };
      setBanners(prev => [...prev, newBanner]);
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const handleDelete = (key: string) => {
    setBanners(prev => prev.filter(banner => banner.key !== key));
  };

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'hinh_anh',
      key: 'hinh_anh',
      render: (src: string) => <Image width={120} src={src} />,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'tieu_de',
      key: 'tieu_de',
    },
    {
      title: 'Mô tả',
      dataIndex: 'mo_ta',
      key: 'mo_ta',
    },
    {
      title: 'Liên kết',
      dataIndex: 'lien_ket',
      key: 'lien_ket',
      render: (url: string) => url ? <a href={url} target="_blank" rel="noreferrer">{url}</a> : '—',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: BannerType) => (
        <Space>
          {/* Có thể thêm nút Sửa ở đây */}
          <Popconfirm title="Bạn có chắc muốn xoá?" onConfirm={() => handleDelete(record.key)}>
            <Button danger>Xoá</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Quản lý Banner</h2>
        {/* <Button type="primary" onClick={showModal}>
          Thêm Banner
        </Button> */}
        <AddBanner />
      </div>

      <Table dataSource={banners} columns={columns} pagination={{ pageSize: 5 }} />

      {/* <Modal
        title="Thêm Banner mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Tiêu đề" name="tieu_de" rules={[{ required: true, message: 'Nhập tiêu đề!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="mo_ta">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item label="Hình ảnh (URL)" name="hinh_anh" rules={[{ required: true, message: 'Nhập URL hình ảnh!' }]}>
            <Input placeholder="https://..." />
          </Form.Item>
          <Form.Item label="Liên kết" name="lien_ket">
            <Input placeholder="https://..." />
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
};

export default QuanLyBanner;
