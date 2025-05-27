import { Form, Input, Button } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import type { CategoryFormValues } from "../../../types/categorys/category";


type Props = {
  onFinish: (values: CategoryFormValues) => void;
  onCancel: () => void;
};

export default function AddCategoryForm({ onFinish, onCancel }: Props) {
  const [form] = Form.useForm<CategoryFormValues>();
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleSubmit = (values: CategoryFormValues) => {
    const formattedValues = {
      ...values,
      createdAt: dayjs().format("YYYY-MM-DD"),
    };
    onFinish(formattedValues);
    form.resetFields();
    setImagePreview("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImagePreview(url);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Tên danh mục"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Link hình ảnh"
        name="image"
        rules={[{ required: true, message: "Vui lòng nhập link hình ảnh!" }]}
      >
        <Input onChange={handleImageChange} />
      </Form.Item>

      {imagePreview && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Xem trước hình ảnh:</p>
          <img
            src={imagePreview}
            alt="Preview"
            className="w-40 h-40 object-cover border rounded shadow"
          />
        </div>
      )}

      <Form.Item>
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
