import React from 'react'
import {
  Form,
  Input,
  Button,
  InputNumber,
  Upload,
  Select,
  Space,
  Card,
  message,
} from 'antd'
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import type { UploadFile } from 'antd/es/upload/interface'
import { useListCategory as useCategoryList } from '../../../hooks/useCategory'
import { useList as useAttributeList } from '../../../hooks/useAttribute'
import { useCreateProduct } from '../../../hooks/useproduct'
import type { Category } from '../../../types/categorys/category'

const { TextArea } = Input

type AttributeValue = {
  thuoc_tinh_id: number
  gia_tri: string
}

type VariantInput = {
  so_luong: number
  gia: number
  gia_khuyen_mai?: number
  hinh_anh: UploadFile[]
  thuoc_tinh: AttributeValue[]
}

type FormData = {
  ten: string
  gia: string
  gia_khuyen_mai: string
  so_luong: number
  mo_ta: string
  hinh_anh?: UploadFile[]
  danh_muc_id: number
  variants: VariantInput[]
}

const AddProduct: React.FC = () => {
  const { data: categories = [] } = useCategoryList()
  const { data: attributes = [] } = useAttributeList()
  const createProduct = useCreateProduct()

  const {
    control,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      gia_khuyen_mai: '',
      variants: [],
    },
  })

  const { fields: variantFields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  })

  const onSubmit = (data: FormData) => {
    const formData = new FormData()

    formData.append('ten', data.ten)
    formData.append('gia', data.gia)
    formData.append('gia_khuyen_mai', data.gia_khuyen_mai || '0')
    formData.append('so_luong', String(data.so_luong))
    formData.append('mo_ta', data.mo_ta ?? '')
    formData.append('danh_muc_id', String(data.danh_muc_id))

    if (data.hinh_anh?.[0]?.originFileObj instanceof File) {
      formData.append('hinh_anh', data.hinh_anh[0].originFileObj)
    }

    data.variants.forEach((variant, index) => {
      formData.append(`variants[${index}][gia]`, String(variant.gia))
      formData.append(`variants[${index}][gia_khuyen_mai]`, String(variant.gia_khuyen_mai || 0))
      formData.append(`variants[${index}][so_luong]`, String(variant.so_luong))

      const file = variant.hinh_anh?.[0]
      if (file?.originFileObj instanceof File) {
        formData.append(`variants[${index}][hinh_anh]`, file.originFileObj)
      }

      variant.thuoc_tinh.forEach((attr, attrIndex) => {
        formData.append(`variants[${index}][attributes][${attrIndex}][thuoc_tinh_id]`, String(attr.thuoc_tinh_id))
        formData.append(`variants[${index}][attributes][${attrIndex}][gia_tri]`, attr.gia_tri)
      })
    })

    createProduct.mutate(formData, {
      onSuccess: () => message.success(' Thêm sản phẩm thành công!'),
      onError: (err) => {
        console.error(' Lỗi gửi form:', err.response?.data)
        message.error(' Thêm sản phẩm thất bại!')
      }
    })
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Thêm sản phẩm</h2>

      <Form.Item label="Tên sản phẩm">
        <Controller name="ten" control={control} render={({ field }) => <Input {...field} />} />
      </Form.Item>


      <Form.Item label="Tổng Số lượng ">
        <Controller name="so_luong" control={control} render={({ field }) => <Input {...field} />} />
      </Form.Item>

      <Form.Item label="Mô tả">
        <Controller name="mo_ta" control={control} render={({ field }) => <TextArea rows={4} {...field} />} />
      </Form.Item>

      <Form.Item label="Danh mục">
        <Controller
          name="danh_muc_id"
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder="Chọn danh mục">
              {categories.map((cat: Category) => (
                <Select.Option key={cat.id} value={cat.id}>{cat.ten}</Select.Option>
              ))}
            </Select>
          )}
        />
      </Form.Item>

      <Form.Item label="Ảnh sản phẩm">
        <Controller
          control={control}
          name="hinh_anh"
          render={({ field }) => (
            <Upload
              listType="picture-card"
              fileList={field.value as UploadFile[]}
              beforeUpload={() => false}
              onChange={({ fileList }) => field.onChange(fileList)}
              maxCount={1}
            >
              {(!field.value || field.value.length < 1) && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Tải ảnh</div>
                </div>
              )}
            </Upload>
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
                thuoc_tinh: attributes.map((attr) => ({
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
            <h4>Biến thể #{variantIndex + 1}</h4>
            <p>giá </p>
            <Controller name={`variants.${variantIndex}.gia`} control={control} render={({ field }) => <Input placeholder="Giá" {...field} />} />
            giá KM
            <Controller name={`variants.${variantIndex}.gia_khuyen_mai`} control={control} render={({ field }) => <Input placeholder="Giá KM" {...field} />} />
            số lượng 
            <Controller name={`variants.${variantIndex}.so_luong`} control={control} render={({ field }) => <Input placeholder="Số lượng" {...field} />} />

            <Form.Item label="Ảnh biến thể">
              <Controller
                control={control}
                name={`variants.${variantIndex}.hinh_anh`}
                render={({ field: { value = [], onChange } }) => (
                  <Upload
                    listType="picture"
                    fileList={value}
                    beforeUpload={() => false}
                    maxCount={1}
                    onChange={({ fileList }) => {
                      const validList = fileList.filter(file => !!file.originFileObj)
                      onChange(validList)
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Tải ảnh</Button>
                  </Upload>
                )}
              />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              {attributes.map((attr, attrIndex) => (
                <Form.Item label={attr.ten} key={attrIndex}>
                  <Controller
                    name={`variants.${variantIndex}.thuoc_tinh.${attrIndex}.gia_tri`}
                    control={control}
                    render={({ field }) => <Input placeholder={`Nhập ${attr.ten}`} {...field} />}
                  />
                </Form.Item>
              ))}
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
  )
}

export default AddProduct

