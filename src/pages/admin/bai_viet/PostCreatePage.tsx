import React, { useState } from "react";
import { Button, Card, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../../hooks/usePost";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { TextArea } = Input;

const PostCreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate: createPost, isPending } = useCreatePost();
  const [noiDung, setNoiDung] = useState("");

  const onFinish = (values: any) => {
    const fileObj = values.anh_dai_dien?.[0]?.originFileObj;
    if (!fileObj) {
      message.error("Vui lòng chọn ảnh đại diện");
      return;
    }

    const formData = new FormData();
    formData.append("tieu_de", values.tieu_de);
    formData.append("mo_ta_ngan", values.mo_ta_ngan);
    formData.append("noi_dung", noiDung);
    formData.append("anh_dai_dien", fileObj); // gửi file gốc

    createPost(formData, {
      onSuccess: () => {
        message.success("Thêm bài viết thành công!");
        form.resetFields();
        setNoiDung("");
        navigate("/admin/bai_viet");
      },
      onError: () => {
        message.error("Thêm bài viết thất bại!");
      },
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card title="Thêm bài viết mới" bordered={false} className="shadow rounded-xl">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tiêu đề"
            name="tieu_de"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input placeholder="Nhập tiêu đề bài viết" />
          </Form.Item>

          <Form.Item
            label="Mô tả ngắn"
            name="mo_ta_ngan"
            rules={[{ required: true, message: "Vui lòng nhập mô tả ngắn!" }]}
          >
            <TextArea rows={3} placeholder="Nhập mô tả ngắn" />
          </Form.Item>
     <Form.Item
            label="Ảnh đại diện"
            name="anh_dai_dien"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện" }]}
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Nội dung" required>
            <ReactQuill
              theme="snow"
              value={noiDung}
              onChange={setNoiDung}
              placeholder="Nhập nội dung bài viết..."
              style={{ height: 300, marginBottom: 50 }}
            />
          </Form.Item>

     

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Thêm bài viết
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PostCreatePage;
