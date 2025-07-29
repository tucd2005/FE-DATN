import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select, Spin, Upload, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
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
    const [fileList, setFileList] = useState<any[]>([]);
    const [existingImage, setExistingImage] = useState<string | null>(null);

    const { data: post, isLoading } = usePostDetail(id!);
    const { mutate: updatePost } = useUpdatePost();

    useEffect(() => {
        if (post) {
            form.setFieldsValue({
                tieu_de: post.tieu_de,
                mo_ta_ngan: post.mo_ta_ngan,
                trang_thai: post.trang_thai,
            });
            setNoiDung(post.noi_dung);
            setExistingImage(post.anh_dai_dien ?? null);
        }
    }, [post]);

    const onFinish = (values: any) => {
        const formData = new FormData();

        formData.append("_method", "POST"); // Laravel yêu cầu nếu gửi POST
        formData.append("tieu_de", values.tieu_de);
        formData.append("mo_ta_ngan", values.mo_ta_ngan || "");
        formData.append("trang_thai", values.trang_thai);
        formData.append("noi_dung", noiDung || "");

        // Nếu có ảnh mới thì gửi, không thì bỏ qua
        const fileObj = fileList?.[0]?.originFileObj;
        if (fileObj) {
            formData.append("anh_dai_dien", fileObj);
        }

        updatePost(
            { id: Number(id), data: formData },
            {
                onSuccess: () => {
                    toast.success("Cập nhật thành công!");
                    navigate("/admin/bai_viet");
                },
                onError: (error: any) => {
                    if (error.response?.status === 422) {
                        const errors = error.response.data.errors;
                        Object.values(errors).forEach((errMsg: any) => {
                            toast.error(errMsg[0]);
                        });
                    } else {
                        toast.error("Lỗi không xác định!");
                    }
                },
            }
        );
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

                    <Form.Item label="Ảnh đại diện">
                        {fileList.length === 0 && existingImage ? (
                            <Image
                                width={200}
                                src={`http://localhost:8000/storage/${existingImage}`}
                                alt="Ảnh đại diện"
                            />
                        ) : fileList.length > 0 ? (
                            <Image
                                width={200}
                                src={URL.createObjectURL(fileList[0].originFileObj)}
                                alt="Ảnh mới"
                            />
                        ) : (
                            <p>Không có ảnh</p>
                        )}
                    </Form.Item>

                    <Form.Item label="Thay ảnh đại diện (nếu muốn)">
                        <Upload
                            beforeUpload={() => false}
                            maxCount={1}
                            accept="image/*"
                            listType="picture"
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
                        </Upload>
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
