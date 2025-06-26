import { Form, Input, Button, Upload, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const EditDanhMuc = () => {



    return (
        <div className="p-4 bg-white max-w-xl mx-auto mt-8 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa danh mục</h2>
            <Form layout="vertical">
                <Form.Item
                    label="Tên danh mục"
                    name="ten"
                    rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
                >
                    <Input placeholder="Nhập tên danh mục" />
                </Form.Item>
                <Form.Item label="Mô tả" name="mo_ta">
                    <Input.TextArea placeholder="Nhập mô tả (tuỳ chọn)" />
                </Form.Item>
                <Form.Item label="Ảnh hiện tại">
                    <Image width={100} src="http://localhost:8000/storage/example.jpg" />
                </Form.Item>
                <Form.Item label="Ảnh mới" name="image">
                    <Upload beforeUpload={() => false} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Cập nhật danh mục
                    </Button>
                    <Button style={{ marginLeft: 8 }}>
                        Huỷ
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
} 