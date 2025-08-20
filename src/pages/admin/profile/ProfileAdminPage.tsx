import { useEffect, useState } from "react";
import {
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    Upload,
    Spin,
    Avatar,
} from "antd";
import { CameraOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useProfile } from "../../../hooks/useProfileAdmin";

export default function ProfilePage() {
    const { profileQuery, updateProfileMutation } = useProfile();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);

    useEffect(() => {
        if (profileQuery.data) {
            form.setFieldsValue({
                name: profileQuery.data.name,
                email: profileQuery.data.email,
                so_dien_thoai: profileQuery.data.so_dien_thoai,
                gioi_tinh: profileQuery.data.gioi_tinh,
                ngay_sinh: profileQuery.data.ngay_sinh
                    ? dayjs(profileQuery.data.ngay_sinh)
                    : null,
            });

            if (profileQuery.data.anh_dai_dien) {
                const imageUrl = `http://localhost:8000/storage/${profileQuery.data.anh_dai_dien}`;
                setFileList([
                    {
                        uid: "-1",
                        name: "avatar",
                        status: "done",
                        url: imageUrl,
                    },
                ]);
            } else {
                setFileList([]);
            }
        }
    }, [profileQuery.data, form]);

    const onFinish = (values: any) => {
        const formData = new FormData();
        formData.append("name", values.name ?? "");
        formData.append("email", values.email ?? "");
        formData.append("so_dien_thoai", values.so_dien_thoai ?? "");
        formData.append("gioi_tinh", values.gioi_tinh ?? "");
        formData.append(
            "ngay_sinh",
            values.ngay_sinh ? values.ngay_sinh.format("YYYY-MM-DD") : ""
        );

        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append("anh_dai_dien", fileList[0].originFileObj);
        }

        updateProfileMutation.mutate(formData);
    };

    if (profileQuery.isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
            <div className="flex flex-col items-center mb-6 relative">
                <Avatar
                    size={120}
                    src={
                        fileList[0]?.originFileObj
                            ? URL.createObjectURL(fileList[0].originFileObj)
                            : fileList[0]?.url
                    }
                />
                <Upload
                    showUploadList={false}
                    beforeUpload={(file) => {
                        setFileList([{ ...file, originFileObj: file }]);
                        return false;
                    }}
                    accept="image/*"
                >
                    <Button
                        shape="circle"
                        icon={<CameraOutlined />}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            right: "calc(50% - 60px)",
                            transform: "translateX(50%)",
                        }}
                    />
                </Upload>
            </div>

            <h1 className="text-xl font-bold text-center mb-4">
                Cập nhật thông tin cá nhân
            </h1>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ gioi_tinh: "nam" }}
            >
                <Form.Item label="Họ và tên" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Số điện thoại" name="so_dien_thoai">
                    <Input />
                </Form.Item>

                <Form.Item label="Giới tính" name="gioi_tinh">
                    <Select
                        options={[
                            { value: "nam", label: "Nam" },
                            { value: "nu", label: "Nữ" },
                            { value: "khac", label: "Khác" },
                        ]}
                    />
                </Form.Item>

                <Form.Item label="Ngày sinh" name="ngay_sinh">
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={updateProfileMutation.isPending}
                    block
                >
                    Lưu thay đổi
                </Button>
            </Form>
        </div>
    );
}
