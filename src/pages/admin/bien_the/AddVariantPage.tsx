import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { attributeService, getAttributeValuesByAttributeId } from "../../../services/attribute";
import { variantService } from "../../../services/variantService";
import { Button, Form, InputNumber, Input, Select, Upload, message, Card, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Option } = Select;

const AddVariantPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [attributes, setAttributes] = useState<any[]>([]);
  const [attributeValues, setAttributeValues] = useState<Record<number, any[]>>({});
  const [selectedAttributes, setSelectedAttributes] = useState<Record<number, string>>({});
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    attributeService.getAll().then((data) => {
      setAttributes(data);
    });
  }, []);

  // Lấy giá trị thuộc tính cho tất cả thuộc tính
  useEffect(() => {
    if (attributes.length > 0) {
      attributes.forEach(async (attr) => {
        if (!attributeValues[attr.id]) {
          const values = await getAttributeValuesByAttributeId(attr.id);
          setAttributeValues((prev) => ({ ...prev, [attr.id]: values }));
        }
      });
    }
  }, [attributes]);

  const handleSelectAttributeValue = (attrId: number, value: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [attrId]: value }));
  };

  // Xử lý upload ảnh
  const handleUploadChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList.slice(-4)); // Tối đa 4 ảnh
  };

  // Submit form
  const onFinish = async (values: any) => {
    if (!productId) return;
    // Validate: nếu có thuộc tính thì phải chọn đủ giá trị
    if (attributes.length > 0 && attributes.some(attr => !selectedAttributes[attr.id])) {
      message.error("Vui lòng chọn đầy đủ giá trị cho tất cả thuộc tính.");
      return;
    }
 
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("so_luong", values.so_luong);
      formData.append("gia", String(values.gia));
      formData.append("gia_khuyen_mai", String(values.gia_khuyen_mai ?? 0));
      attributes.forEach((attr, idx) => {
        formData.append(`attributes[${idx}][thuoc_tinh_id]`, String(attr.id));
        formData.append(`attributes[${idx}][gia_tri]`, selectedAttributes[attr.id]);
      });
      // Log FormData
      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      fileList.forEach((fileObj: any) => {
        if (fileObj.originFileObj) {
          formData.append("images[]", fileObj.originFileObj);
        }
      });
      await variantService.create(Number(productId), formData);
      toast.success("Thêm biến thể thành công!");
      navigate(`/admin/san-pham/chi-tiet/${productId}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Thêm biến thể thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Thêm biến thể sản phẩm" style={{ maxWidth: 700, margin: "0 auto" }}>
      <Form layout="vertical" onFinish={onFinish} onFinishFailed={(err) => { console.log('Form error:', err); message.error('Vui lòng nhập đầy đủ thông tin!'); }}>
        <Form.Item
          label="Số lượng"
          name="so_luong"
          rules={[{ required: true, message: "Nhập số lượng" }]}
        >
          <InputNumber
            min={1}
            style={{ width: "100%" }}
            onPressEnter={e => e.currentTarget.blur()}
            onBlur={e => e.currentTarget.blur()}
          />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="gia"
          rules={[{ required: true, message: "Nhập giá" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            onPressEnter={e => e.currentTarget.blur()}
            onBlur={e => e.currentTarget.blur()}
            formatter={(value) =>
              value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ" : ""
            }
            parser={(value) =>
              value ? value.replace(/\./g, "").replace("đ", "") : ""
            }
          />
        </Form.Item>

        <Form.Item
          label="Giá khuyến mãi"
          name="gia_khuyen_mai"
          rules={[{ required: false }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            onPressEnter={e => e.currentTarget.blur()}
            onBlur={e => e.currentTarget.blur()}
            defaultValue={0}
            formatter={(value) =>
              value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ" : ""
            }
            parser={(value) =>
              value ? value.replace(/\./g, "").replace("đ", "") : ""
            }
          />
        </Form.Item>

        <Form.Item label="Ảnh (tối đa 1 ảnh)">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            multiple
            maxCount={1}
          >
            {fileList.length >= 1 ? null : <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>}
          </Upload>
        </Form.Item>
        <Form.Item label="Thuộc tính biến thể">
          <Space direction="vertical" style={{ width: "100%" }}>
            {attributes.map((attr) => (
              <Form.Item key={attr.id} label={attr.ten} required name={`attr_${attr.id}`} rules={[{ required: true, message: `Chọn giá trị cho ${attr.ten}` }]}>
                <Select

                  placeholder={`Chọn ${attr.ten}`}
                  value={selectedAttributes[attr.id] || undefined}
                  onChange={(val) => handleSelectAttributeValue(attr.id, val)}
                >
                  <Option value="" disabled>-- Giá trị --</Option>
                  {(attributeValues[attr.id] || []).map((v) => (
                    <Option key={v.gia_tri} value={v.gia_tri}>{v.gia_tri}</Option>
                  ))}
                </Select>
              </Form.Item>
            ))}
          </Space>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Thêm biến thể</Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate(-1)}>Quay lại</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddVariantPage;
