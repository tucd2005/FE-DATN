import { Form, Input, Button, Upload, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";
import { useOneCategory, useUpdateCategory } from "../../../hooks/useCategory";

interface CategoryFormValues {
    ten: string;
    mo_ta?: string;
    image?: UploadFile[];
}

export default function EditDanhMuc() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm<CategoryFormValues>();
    const { data: category, isLoading } = useOneCategory(id as string);
    const { mutate: updateCategory, status } = useUpdateCategory(id as string);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (category) {
            form.setFieldsValue({
                ten: category.ten,
                mo_ta: category.mo_ta,
            });

            if (category.image) {
                setFileList([
                    {
                        uid: "-1",
                        name: "image.png",
                        status: "done",
                        url: `http://localhost:8000/storage/${category.image}`,
                    },
                ]);
            }
        }
    }, [category, form]);

    const onFinish = (values: CategoryFormValues) => {
        const formData = new FormData();
        formData.append("ten", values.ten);
        formData.append("mo_ta", values.mo_ta || "");
        if (fileList[0] && fileList[0].originFileObj) {
            formData.append("image", fileList[0].originFileObj as File);
        }
        updateCategory(formData, {
            onSuccess: () => {
                navigate("/admin/danh-muc");
            },
        });
    };

    return (
        <div className="p-4 bg-white max-w-xl mx-auto mt-8 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa danh mục</h2>
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
                {category?.image && (
                    <Form.Item label="Ảnh hiện tại">
                        <Image
                            width={100}
                            src={`http://localhost:8000/storage/${category.image}`}
                        />
                    </Form.Item>
                )}
                <Form.Item label="Ảnh mới" name="image">
                    <Upload
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList as UploadFile[])}
                        maxCount={1}
                        listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={status === "pending"}
                    >
                        Cập nhật danh mục
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => navigate(-1)}>
                        Huỷ
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}