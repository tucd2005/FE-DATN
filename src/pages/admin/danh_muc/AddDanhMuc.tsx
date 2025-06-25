import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCreateCategory } from "../../../hooks/useCategory";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";

interface CategoryFormValues {
    ten: string;
    mo_ta?: string;
    image?: UploadFile[];
}

export default function AddDanhMuc() {
    const [form] = Form.useForm<CategoryFormValues>();
    const navigate = useNavigate();
    const { mutate: createCategory, status } = useCreateCategory();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onFinish = (values: CategoryFormValues) => {
        const formData = new FormData();
        console.log(fileList)
        formData.append("ten", values.ten);
        formData.append("mo_ta", values.mo_ta || "");
        if (fileList[0]) {
            formData.append("image", fileList[0].originFileObj as File);
        }
        createCategory(formData, {
            onSuccess: () => {
                navigate("/admin/danh-muc");
            },
        });
    };

    return (
        <div className="p-4 bg-white max-w-xl mx-auto mt-8 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Thêm danh mục</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ ten: "", mo_ta: "" }}
            >
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
                <Form.Item label="Ảnh" name="image">
                    <Upload
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList as UploadFile[])}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={status === 'pending'}>
                        Thêm danh mục
                    </Button>
                    <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => navigate("/admin/category")}
                    >
                        Huỷ
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
} 