import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import {
  useUpdateVariant,
  useVariantById,
} from "../../../hooks/useVariant";
import { useList, useAllAttributeValues } from "../../../hooks/useAttribute";

const EditVariantPage = () => {
  const { id } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  const validId = id && !isNaN(Number(id));
  const { data: variantDetail, isLoading: isLoadingDetail } = useVariantById(validId ? Number(id) : 0);
  const { data: attributes = [] } = useList();
  const { mutate, isPending } = useUpdateVariant(validId ? Number(id) : 0, variantDetail?.san_pham_id || 0);
  const attributeIds = attributes.map((a: { id: number }) => a.id);
  const attributeValuesList = useAllAttributeValues(attributeIds);

  useEffect(() => {
    if (variantDetail && attributes.length > 0) {
      const { gia, gia_khuyen_mai, so_luong, hinh_anh, thuoc_tinh } = variantDetail;
      const defaultImages = Array.isArray(hinh_anh)
        ? hinh_anh.map((url: string, idx: number) => ({
            uid: String(-idx - 1),
            name: url.split('/').pop() ||
            `image-${idx}`,
            url: url.startsWith('http') ? url : `http://127.0.0.1:8000/storage/${url}`,
            status: "done",
          }))
        : [];
      const attrObj: Record<number, string> = {};
      if (Array.isArray(thuoc_tinh)) {
        thuoc_tinh.forEach((item: any) => {
          const found = attributes.find((a: any) =>
            a.ten.trim().toLowerCase() === item.ten.trim().toLowerCase()
          );
          if (found && found.id) {
            attrObj[found.id] = item.gia_tri;
          }
        });
      }
      console.log('attributes:', attributes);
      console.log('attrObj:', attrObj);
      form.setFieldsValue({
        gia,
        gia_khuyen_mai,
        so_luong,
        hinh_anh: defaultImages,
        attributes: attrObj,
      });
    }
  }, [variantDetail, attributes, form]);

  if (!validId) {
    return <div>Không tìm thấy biến thể!</div>;
  }

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("gia", String(values.gia));
    formData.append("so_luong", String(values.so_luong));
    if (values.gia_khuyen_mai !== undefined && values.gia_khuyen_mai !== null) {
      formData.append("gia_khuyen_mai", String(values.gia_khuyen_mai));
    }
    // Ảnh
    const images = values.hinh_anh || [];
    for (const file of images) {
      if (file.originFileObj) {
        formData.append("images[]", file.originFileObj);
      }
      // Không fetch lại file.url (ảnh cũ)
    }
    // Thuộc tính
    if (values.attributes) {
      // Lọc ra các cặp id và giá trị hợp lệ
      const validAttrs = Object.entries(values.attributes)
        .filter(([attrId, gia_tri]) => attrId && attrId !== "0" && gia_tri !== undefined && gia_tri !== "");
      validAttrs.forEach(([attrId, gia_tri], idx) => {
        formData.append(`attributes[${idx}][thuoc_tinh_id]`, attrId);
        formData.append(`attributes[${idx}][gia_tri]`, gia_tri as string);
      });
    }
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    mutate(formData as any, {
      onSuccess: () => {
        message.success("Cập nhật biến thể thành công!");
        navigate(-1);
      },
      onError: () => {
        message.error("Cập nhật thất bại!");
      },
    });
  };

  if (isLoadingDetail) {
    return (
      <div className="text-center mt-20">
        <Spin />
      </div>
    );
  }

  return (
    <Card title="Cập nhật biến thể" className="max-w-3xl mx-auto">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          hinh_anh: [],
        }}
      >
        <Form.Item label="Giá" name="gia" rules={[{ required: true }]}>
          <InputNumber min={0} className="w-full" />
        </Form.Item>
        <Form.Item label="Giá khuyến mãi" name="gia_khuyen_mai">
          <InputNumber min={0} className="w-full" />
        </Form.Item>
        <Form.Item label="Số lượng" name="so_luong" rules={[{ required: true }]}>
          <InputNumber min={0} className="w-full" />
        </Form.Item>
        <Form.Item
          label="Hình ảnh"
          name="hinh_anh"
          valuePropName="fileList"
          getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
        >
          <Upload
            listType="picture"
            beforeUpload={() => false}
            multiple
            maxCount={5}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>
        {attributes.map((attr: { id: number; ten: string }, idx: number) => {
          const values = attributeValuesList[idx]?.data || [];
          return (
            <Form.Item
              key={attr.id}
              label={attr.ten}
              name={["attributes", attr.id]}
              rules={[{ required: true, message: "Vui lòng chọn giá trị" }]}
            >
              <Select placeholder={`Chọn ${attr.ten}`}>
                {values.map((v: { gia_tri: string }) => (
                  <Select.Option key={v.gia_tri} value={v.gia_tri}>
                    {v.gia_tri}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          );
        })}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditVariantPage;
  