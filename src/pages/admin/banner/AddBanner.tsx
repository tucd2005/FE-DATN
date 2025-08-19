import React from "react";
import { Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCreateBanner } from "../../../hooks/useBanner";

const BannerAddForm: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { mutate, isPending } = useCreateBanner();

    const onFinish = async (values: any) => {
        const fileObj = values.hinh_anh?.[0]?.originFileObj;
        if (!fileObj) {
            message.error("Vui lòng chọn hình ảnh");
            return;
        }


        const formData = new FormData();
        formData.append("tieu_de", values.tieu_de);
        formData.append("hinh_anh", fileObj); // 🟢 Gửi file ảnh thật

        mutate(formData, {
            onSuccess: () => {
                message.success("Thêm banner thành công!");
                navigate("/admin/banners");
            },
            onError: (err: any) => {
                message.error("Thêm banner thất bại!");
                console.error(err);
            },
        });
    };

    return (
        <div className="p-4  mx-auto">
            <h2 className="text-xl font-semibold mb-4">Thêm Banner</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ tieu_de: "" }}
            >
                <Form.Item
                    label="Tiêu đề"
                    name="tieu_de"
                    rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
                >
                    <Input placeholder="Nhập tiêu đề banner" />
                </Form.Item>

                <Form.Item
                    label="Hình ảnh"
                    name="hinh_anh"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    rules={[{ required: true, message: "Vui lòng chọn hình ảnh" }]}
                >
                    <Upload
                        beforeUpload={() => false} // Ngăn antd upload auto
                        maxCount={1}
                        accept="image/*"
                        listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isPending} block>
                        Thêm Banner
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default BannerAddForm;
