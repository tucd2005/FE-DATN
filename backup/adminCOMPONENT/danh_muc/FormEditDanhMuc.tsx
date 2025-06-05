import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";

type Props = {
  onFinish: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
};

export default function EditCategoryForm({ onFinish, onCancel, initialValues }: Props) {
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setImagePreview(initialValues.image || "");
    }
  }, [initialValues]);

const handleSubmit = (values: any) => {
  // Khi edit giữ nguyên createdAt ban đầu nếu có
  if (initialValues?.createdAt) {
    values.createdAt = initialValues.createdAt;
  }
  onFinish(values);
  form.resetFields();
  setImagePreview("");
};

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImagePreview(e.target.value);
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
            Cập nhật
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
