import React from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  Space,
  Card,
  message,
  InputNumber,
} from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import type { UploadFile } from 'antd/es/upload/interface';
import { useListCategory as useCategoryList } from '../../../hooks/useCategory';
import { useAllAttributeValues, useList as useAttributeList } from '../../../hooks/useAttribute';
import { useCreateProduct } from '../../../hooks/useProduct';
import type { Category } from '../../../types/categorys/category';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

type AttributeValue = {
  thuoc_tinh_id: number;
  gia_tri: string;
};

type VariantInput = {
  so_luong: number;
  gia: number;
  gia_khuyen_mai?: number;
  hinh_anh: UploadFile[];
  thuoc_tinh: AttributeValue[];
};

type FormData = {
  ten: string;
  gia: string;
  gia_khuyen_mai: string;
  so_luong: number;
  mo_ta: string;
  hinh_anh?: UploadFile[];
  danh_muc_id: number;
  variants: VariantInput[];
};

const AddProduct: React.FC = () => {
  const { data: categories = [] } = useCategoryList();
  const { data: attributes = [] } = useAttributeList();
  const createProduct = useCreateProduct();
  const navigate = useNavigate();

  const attributeIds = attributes.map(attr => attr.id);
  const attributeValuesQueries = useAllAttributeValues(attributeIds);

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { gia_khuyen_mai: '', variants: [] },
  });

  const { fields: variantFields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append('ten', data.ten);
    formData.append('gia', data.gia);
    formData.append('gia_khuyen_mai', data.gia_khuyen_mai || '0');
    formData.append('so_luong', String(data.so_luong));
    formData.append('mo_ta', data.mo_ta ?? '');
    formData.append('danh_muc_id', String(data.danh_muc_id));

    if (data.hinh_anh?.[0]?.originFileObj instanceof File) {
      formData.append('hinh_anh', data.hinh_anh[0].originFileObj);
    }

    data.variants.forEach((variant, index) => {
      formData.append(`variants[${index}][gia]`, String(variant.gia));
      formData.append(`variants[${index}][gia_khuyen_mai]`, String(variant.gia_khuyen_mai || 0));
      formData.append(`variants[${index}][so_luong]`, String(variant.so_luong));

      // Gửi đúng dạng mảng ảnh
      variant.hinh_anh?.forEach((file, fileIndex) => {
        if (file.originFileObj instanceof File) {
          formData.append(`variants[${index}][hinh_anh][${fileIndex}]`, file.originFileObj);
        }
      });

      variant.thuoc_tinh.forEach((attr, attrIndex) => {
        formData.append(`variants[${index}][attributes][${attrIndex}][thuoc_tinh_id]`, String(attr.thuoc_tinh_id));
        formData.append(`variants[${index}][attributes][${attrIndex}][gia_tri]`, attr.gia_tri);
      });
    });

    createProduct.mutate(formData, {
      onSuccess: () => {
        message.success('Thêm sản phẩm thành công!');
        navigate('/admin/san-pham');
      },
      onError: (err) => {
        console.error('Lỗi gửi form:', err?.response?.data);
        message.error('Thêm sản phẩm thất bại!');
      }
    });
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Thêm sản phẩm</h2>

    <Form.Item label="Tên sản phẩm" required>
  <Controller
    name="ten"
    control={control}
    rules={{
      required: "Tên sản phẩm là bắt buộc",
      minLength: { value: 3, message: "Tên phải có ít nhất 3 ký tự" }
    }}
    render={({ field, fieldState }) => (
      <>
        <Input {...field} />
        {fieldState.error && <span className="text-red-500">{fieldState.error.message}</span>}
      </>
    )}
  />
</Form.Item>

<Form.Item label="Mô tả">
  <Controller
    name="mo_ta"
    control={control}
    rules={{ minLength: { value: 10, message: "Mô tả tối thiểu 10 ký tự" } }}
    render={({ field, fieldState }) => (
      <>
        <TextArea rows={4} {...field} />
        {fieldState.error && <span className="text-red-500">{fieldState.error.message}</span>}
      </>
    )}
  />
</Form.Item>

<Form.Item label="Danh mục" required>
  <Controller
    name="danh_muc_id"
    control={control}
    rules={{ required: "Vui lòng chọn danh mục" }}
    render={({ field, fieldState }) => (
      <>
        <Select {...field} placeholder="Chọn danh mục">
          {categories.map((cat: Category) => (
            <Select.Option key={cat.id} value={cat.id}>{cat.ten}</Select.Option>
          ))}
        </Select>
        {fieldState.error && <span className="text-red-500">{fieldState.error.message}</span>}
      </>
    )}
  />
</Form.Item>

<Form.Item label="Ảnh sản phẩm" required>
  <Controller
    control={control}
    name="hinh_anh"
    rules={{
      validate: (files) =>
        files && files.length > 0 ? true : "Vui lòng tải ít nhất 1 ảnh"
    }}
    render={({ field, fieldState }) => (
      <>
        <Upload
          listType="picture-card"
          fileList={field.value as UploadFile[]}
          beforeUpload={() => false}
          onChange={({ fileList }) => field.onChange(fileList)}
          multiple
        >
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 1 }}>Tải ảnh</div>
          </div>
        </Upload>
        {fieldState.error && <span className="text-red-500">{fieldState.error.message}</span>}
      </>
    )}
  />
</Form.Item>

      <Card
        title="Danh sách biến thể"
        extra={
          <Button
            icon={<PlusOutlined />}
            onClick={() =>
              append({
                so_luong: 0,
                gia: 0,
                gia_khuyen_mai: 0,
                hinh_anh: [],
                thuoc_tinh: attributes.map(attr => ({
                  thuoc_tinh_id: attr.id,
                  gia_tri: '',
                })),
              })
            }
          >
            Thêm biến thể
          </Button>
        }
      >
        {variantFields.map((variant, variantIndex) => (
          <Space key={variant.id} direction="vertical" className="w-full p-4 border rounded mb-4">
            <h4>Biến thể {variantIndex + 1}</h4>
            <span>Giá gốc</span>
            <Controller
              name={`variants.${variantIndex}.gia`}
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="Nhập giá sản phẩm"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  }
                  parser={(value) => value?.replace(/\./g, "").replace("đ", "") as any}
                />
              )}
            />
            <span>Giá khuyến mãi</span>
            <Controller
              name={`variants.${variantIndex}.gia_khuyen_mai`}
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="Nhập giá khuyến mãi"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") 
                  }
                  parser={(value) => value?.replace(/\./g, "").replace("đ", "") as any}
                />
              )}
            />

            <span>Số lượng</span>
            <Controller
              name={`variants.${variantIndex}.so_luong`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min={0}
                  placeholder="Số lượng"
                  value={field.value === 0 ? '' : field.value ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || Number(val) >= 0) {
                      field.onChange(val);
                    }
                  }}
                />
              )}
            />

            <Form.Item label="Ảnh biến thể">
              <Controller
                control={control}
                name={`variants.${variantIndex}.hinh_anh`}
                render={({ field: { value = [], onChange } }) => (
                  <Upload
                    listType="picture"
                    fileList={value}
                    beforeUpload={() => false}
                    maxCount={3} // cho phép nhiều ảnh
                    onChange={({ fileList }) => onChange(fileList.filter(file => !!file.originFileObj))}
                  >
                    <Button icon={<UploadOutlined />}>Tải ảnh</Button>
                  </Upload>
                )}
              />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              {attributes.map((attr, attrIndex) => {
                const values = attributeValuesQueries[attrIndex]?.data ?? [];
                return (
                  <Form.Item label={attr.ten} key={attrIndex}>
                    <Controller
                      name={`variants.${variantIndex}.thuoc_tinh.${attrIndex}.gia_tri`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder={`Chọn ${attr.ten}`}
                          onChange={field.onChange}
                        >
                          {values.map(v => (
                            <Select.Option key={v.gia_tri} value={v.gia_tri}>
                              {/* nếu là màu (#xxxxxx) thì hiện ô màu */}
                              {v.gia_tri.startsWith('#') ? (
                                <span style={{ display: 'inline-block', width: 16, height: 16, backgroundColor: v.gia_tri, marginRight: 4, border: '1px solid #ccc' }} />
                              ) : null}
                              {v.gia_tri}
                            </Select.Option>
                          ))}
                        </Select>
                      )}
                    />
                  </Form.Item>
                );
              })}
            </div>

            <Button danger icon={<MinusCircleOutlined />} onClick={() => remove(variantIndex)}>
              Xoá biến thể
            </Button>
          </Space>
        ))}
      </Card>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={createProduct.isPending}>
          Lưu sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;
