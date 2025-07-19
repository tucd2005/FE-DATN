import React, { useEffect } from "react";
import { Button, Form, Input, Upload, message, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useBannerDetail, useUpdateBanner } from "../../../hooks/useBanner";

const BannerEditForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useBannerDetail(id!);
  const { mutate, isPending } = useUpdateBanner();

  const banner = data?.data;

  // Load dữ liệu ban đầu vào form
  useEffect(() => {
    if (banner) {
      form.setFieldsValue({
        tieu_de: banner.tieu_de,
        hinh_anh: [], // Để user chọn ảnh mới, ảnh cũ hiện riêng phía dưới
      });
    }
  }, [banner, form]);

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("tieu_de", values.tieu_de);

    const fileObj = values.hinh_anh?.[0]?.originFileObj;
    if (fileObj) {
      formData.append("hinh_anh", fileObj);
    }

    mutate(
      { id: Number(id), data: formData },
      {
        onSuccess: () => {
          message.success("Cập nhật banner thành công!");
          navigate("/admin/banners");
        },
        onError: () => {
          message.error("Cập nhật banner thất bại!");
        },
      }
    );
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Sửa Banner</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ tieu_de: "", hinh_anh: [] }}
      >
        <Form.Item
          label="Tiêu đề"
          name="tieu_de"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input placeholder="Nhập tiêu đề banner" />
        </Form.Item>

        {banner?.hinh_anh && (
          <Form.Item label="Hình ảnh hiện tại">
            <Image
              width={150}
              src={`${import.meta.env.VITE_API_URL}/storage/${banner.hinh_anh}`}
              alt="Banner hiện tại"
              fallback="/no-image.png"
            />
          </Form.Item>
        )}

        <Form.Item
          label="Cập nhật hình ảnh mới"
          name="hinh_anh"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => Array.isArray(e) ? e : e?.fileList}
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false} // Không upload tự động
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            block
            disabled={isLoading}
          >
            Cập nhật Banner
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BannerEditForm;
