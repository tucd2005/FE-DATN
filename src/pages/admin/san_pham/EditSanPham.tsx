import React, { useEffect } from 'react'
import {
  Form, Input, Button, Upload, Select, Space, Card, message
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import type { UploadFile } from 'antd/es/upload/interface'
import { useListCategory as useCategoryList } from '../../../hooks/useCategory'
import { useList as useAttributeList } from '../../../hooks/useAttribute'
import { useProductDetail, useUpdateProduct } from '../../../hooks/useProduct'
import type { Category } from '../../../types/categorys/category'
import { useQueryClient } from '@tanstack/react-query'

const { TextArea } = Input

type AttributeValue = { thuoc_tinh_id: number; gia_tri: string }
type VariantInput = {
  gia: string
  gia_khuyen_mai?: string
  so_luong: number
  hinh_anh: UploadFile[]
  thuoc_tinh: AttributeValue[]
}
type FormData = {
  ten: string
  gia: string
  gia_khuyen_mai: string
  so_luong: number
  mo_ta: string
  danh_muc_id: number
  hinh_anh?: UploadFile[]
  variants: VariantInput[]
}

const EditProduct: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const productId = Number(id)
  const queryClient = useQueryClient();
  const { data: product, refetch, isLoading } = useProductDetail(productId);

  const { data: categories = [] } = useCategoryList()
  const { data: attributes = [] } = useAttributeList()
  const updateProduct = useUpdateProduct()

  const { control, handleSubmit, reset, replace, getValues } = useForm<FormData>({
    defaultValues: {
      ten: '',
      gia: '',
      gia_khuyen_mai: '',
      so_luong: 0,
      mo_ta: '',
      danh_muc_id: 0,
      hinh_anh: [],
      variants: []
    },
  })

  const { fields: variantFields, replace: replaceVariants } = useFieldArray({
    control,
    name: 'variants',
  })

  // Load data vào form khi đã sẵn sàng
  useEffect(() => {
    if (!product || attributes.length === 0) return

    const defaultVariants: VariantInput[] = product.variants.map((v: any) => ({
      gia: String(v.gia || ''),
      gia_khuyen_mai: String(v.gia_khuyen_mai || ''),
      so_luong: v.so_luong,
      hinh_anh: v.hinh_anh ? [{
        uid: `preview-${v.id}`,
        name: 'Ảnh',
        url: `http://127.0.0.1:8000/storage/${v.hinh_anh}`
      }] : [],
      thuoc_tinh: attributes.map((attr) => {
        const matched = v.thuoc_tinh.find((t: any) => t.ten === attr.ten)
        return { thuoc_tinh_id: attr.id, gia_tri: matched?.gia_tri || '' }
      })
    }))

    reset({
      ten: product.ten,
      gia: String(product.variants[0]?.gia || ''),
      gia_khuyen_mai: String(product.variants[0]?.gia_khuyen_mai || ''),
      so_luong: product.so_luong,
      mo_ta: product.mo_ta,
      danh_muc_id: Number(product.danh_muc_id),
      hinh_anh: product.hinh_anh ? [{
        uid: '-1', name: 'Ảnh',
        url: `http://127.0.0.1:8000/storage/${product.hinh_anh}`
      }] : [],
      variants: defaultVariants
    })

    replaceVariants(defaultVariants)
  }, [product, attributes, reset, replaceVariants])

  // Submit handler
  const onSubmit = (data: FormData) => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten', data.ten)
    formData.append('gia', data.gia)
    formData.append('gia_khuyen_mai', data.gia_khuyen_mai || '0')
    formData.append('so_luong', String(data.so_luong))
    formData.append('mo_ta', data.mo_ta || '')
    formData.append('danh_muc_id', String(data.danh_muc_id))

    // Ảnh chính
    const mainImage = data.hinh_anh?.[0]
    if (mainImage?.originFileObj instanceof File) {
      formData.append('hinh_anh', mainImage.originFileObj)
    } else if (mainImage?.url) {
      const fileName = mainImage.url.split('/storage/')[1]
      if (fileName) formData.append('old_hinh_anh', fileName)
    }

    // Biến thể
    data.variants.forEach((variant, idx) => {
      formData.append(`variants[${idx}][gia]`, variant.gia)
      formData.append(`variants[${idx}][gia_khuyen_mai]`, variant.gia_khuyen_mai || '0')
      formData.append(`variants[${idx}][so_luong]`, String(variant.so_luong))

      const img = variant.hinh_anh?.[0]
      if (img?.originFileObj instanceof File) {
        formData.append(`variants[${idx}][hinh_anh]`, img.originFileObj)
      } else if (img?.url) {
        const fileName = img.url.split('/storage/')[1]
        if (fileName) formData.append(`variants[${idx}][old_hinh_anh]`, fileName)
      }

      variant.thuoc_tinh.forEach((attr, attrIdx) => {
        formData.append(`variants[${idx}][attributes][${attrIdx}][thuoc_tinh_id]`, String(attr.thuoc_tinh_id))
        formData.append(`variants[${idx}][attributes][${attrIdx}][gia_tri]`, attr.gia_tri)
      })
    })

    updateProduct.mutate(
      { id: productId, data: formData },
      {
        onSuccess: () => {
          message.success('✅ Cập nhật thành công!');
          queryClient.invalidateQueries({ queryKey: ['products'] });
          queryClient.invalidateQueries({ queryKey: ['product', productId] });
          navigate('/admin/san-pham');
        },
        onError: () => message.error('❌ Cập nhật thất bại!')
      }
    );
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Cập nhật sản phẩm</h2>

      <Form.Item label="Tên sản phẩm">
        <Controller name="ten" control={control} render={({ field }) => <Input {...field} />} />
      </Form.Item>

      <Form.Item label="Tổng số lượng">
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
          name="hinh_anh"
          control={control}
          render={({ field: { value = [], onChange } }) => (
            <Upload
              listType="picture-card"
              fileList={value}
              beforeUpload={() => false}
              maxCount={1}
              onChange={({ fileList }) => onChange(fileList.filter(f => f.originFileObj || f.url))}
            >
              {value.length < 1 && (<div><UploadOutlined /><div style={{ marginTop: 8 }}>Tải ảnh</div></div>)}
            </Upload>
          )}
        />
      </Form.Item>

      <Card title="Danh sách biến thể">
        {variantFields.map((variant, idx) => (
          <Space key={variant.id} direction="vertical" className="w-full p-4 border rounded mb-4">
            <h4>Biến thể #{idx + 1}</h4>

            <Controller name={`variants.${idx}.gia`} control={control} render={({ field }) => <Input placeholder="Giá" {...field} />} />
            <Controller name={`variants.${idx}.gia_khuyen_mai`} control={control} render={({ field }) => <Input placeholder="Giá KM" {...field} />} />
            <Controller name={`variants.${idx}.so_luong`} control={control} render={({ field }) => <Input placeholder="Số lượng" {...field} />} />

            <Form.Item label="Ảnh biến thể">
              <Controller
                name={`variants.${idx}.hinh_anh`}
                control={control}
                render={({ field: { value = [], onChange } }) => (
                  <Upload
                    listType="picture"
                    fileList={value}
                    beforeUpload={() => false}
                    maxCount={1}
                    onChange={({ fileList }) => onChange(fileList.filter(f => f.originFileObj || f.url))}
                  >
                    <Button icon={<UploadOutlined />}>Tải ảnh</Button>
                  </Upload>
                )}
              />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              {attributes.map((attr, attrIdx) => (
                <Form.Item label={attr.ten} key={attrIdx}>
                  <Controller
                    name={`variants.${idx}.thuoc_tinh.${attrIdx}.gia_tri`}
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              ))}
            </div>
          </Space>
        ))}
      </Card>

      <Button onClick={() => console.log(getValues())}>🧪 Xem state hiện tại</Button>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={updateProduct.isPending}>
          Lưu thay đổi
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditProduct
