import React, { useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { useCreatePost } from "../../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { TextArea } = Input;

const PostCreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate: createPost, isLoading } = useCreatePost();
  const [noiDung, setNoiDung] = useState(""); // lưu nội dung rich text

  const onFinish = (values: any) => {
    createPost({ ...values, noi_dung: noiDung }, {
      onSuccess: () => {
        console.log(values);
        
        form.resetFields();
        setNoiDung("");
        navigate("/admin/bai-viet");
      },
    });
  };

  return (
    <div className="p-4">
      <Card title="Thêm bài viết mới" bordered={false} className="shadow rounded-xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
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
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <TextArea rows={3} placeholder="Nhập mô tả ngắn" />
          </Form.Item>

          <Form.Item
            label="Nội dung"
            required
          >
            <ReactQuill
              theme="snow"
              value={noiDung}
              onChange={setNoiDung}
              placeholder="Nhập nội dung bài viết..."
              style={{ height: 300, marginBottom: 50 }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Thêm bài viết
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PostCreatePage;
