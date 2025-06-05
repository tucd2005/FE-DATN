import { Form, Input, Modal, Table, Button, Upload, Image, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const QuanLyDanhMuc = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      id: 1,
      ten: "Quần áo thể thao",
      mo_ta: "Các dòng phổ biến",
      slug: "quna-ao-the-thao",
      ngay_tao: "2024-06-01",
      ngay_cap_nhat: "2024-06-01",
      trang_thai: "Hiển thị",
      anh: "https://5sfashion.vn/storage/upload/images/ckeditor/tieJaR4U6o2c62yH63TF6nHgXHdccNXUCwTiomo7.jpg", // ảnh mẫu
    },
  ]);
  const [imageUrl, setImageUrl] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (!imageUrl) {
          message.error("Vui lòng chọn ảnh cho danh mục!");
          return;
        }

        const newItem = {
          id: data.length + 1,
          ten: values.name,
          mo_ta: values.desc,
          slug: values.name.toLowerCase().replace(/\s+/g, "-"),
          ngay_tao: new Date().toISOString().split("T")[0],
          ngay_cap_nhat: new Date().toISOString().split("T")[0],
          trang_thai: "Hiển thị",
          anh: imageUrl,
        };

        setData([...data, newItem]);
        form.resetFields();
        setImageUrl(null);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log("Validation failed", err);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setImageUrl(null);
    setIsModalOpen(false);
  };

  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result); // Base64 ảnh
    };
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "ten", key: "ten" },
    { title: "Mô tả", dataIndex: "mo_ta", key: "mo_ta" },
    { title: "Slug", dataIndex: "slug", key: "slug" },
    {
      title: "Ảnh",
      dataIndex: "anh",
      key: "anh",
      render: (url) => <Image width={80} src={url} alt="Ảnh danh mục" />,
    },
    { title: "Ngày tạo", dataIndex: "ngay_tao", key: "ngay_tao" },
    { title: "Ngày cập nhật", dataIndex: "ngay_cap_nhat", key: "ngay_cap_nhat" },
    { title: "Trạng thái", dataIndex: "trang_thai", key: "trang_thai" },
  ];

  return (
    <>
      <div className="flex justify-end p-3">
        <Button type="primary" onClick={showModal}>
          Thêm danh mục
        </Button>
      </div>

      {/* <Modal
        title="Thêm danh mục mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="desc"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Ảnh danh mục">
            <Upload
              accept="image/*"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
            {imageUrl && (
              <div className="mt-2">
                <Image width={100} src={imageUrl} />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal> */}

      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default QuanLyDanhMuc;