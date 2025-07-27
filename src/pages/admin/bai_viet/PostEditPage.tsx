import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { usePostDetail, useUpdatePost } from "../../../hooks/usePost";
import { toast } from "react-toastify";

const { TextArea } = Input;
const { Option } = Select;

const PostEditPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [noiDung, setNoiDung] = useState("");

    const { data: post, isLoading } = usePostDetail(id!);
    const { mutate: updatePost } = useUpdatePost();

    useEffect(() => {
        if (post) {
            form.setFieldsValue({
                tieu_de: post.tieu_de,
                mo_ta_ngan: post.mo_ta_ngan,
                trang_thai: post.trang_thai, // 👈 Thêm trạng thái vào form
            });
            setNoiDung(post.noi_dung);
        }
    }, [post]);

    const onFinish = (values: any) => {
        updatePost({
            id: Number(id),
            data: {
                ...values,
                noi_dung: noiDung,
            },
        }, {
            onSuccess: () => {
                toast.success("Cập nhật thành công!");
                navigate("/admin/bai_viet");
            },
            onError: () => {
                toast.error("Cập nhật thất bại!");
            },
        });
    };

    if (isLoading) {
        return <Spin className="flex justify-center items-center h-[300px]" />;
    }

    return (
        <div className="p-4">
            <Card title="Chỉnh sửa bài viết" bordered={false} className="shadow rounded-xl">
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Tiêu đề"
                        name="tieu_de"
                        rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả ngắn"
                        name="mo_ta_ngan"
                        rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                        label="Trạng thái"
                        name="trang_thai"
                        rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
                    >
                        <Select>
                            <Option value="hien">Hiển thị</Option>
                            <Option value="an">Ẩn</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Nội dung" required>
                        <ReactQuill value={noiDung} onChange={setNoiDung} style={{ height: 300 }} />
                    </Form.Item>

                    <Form.Item>
                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default PostEditPage;
