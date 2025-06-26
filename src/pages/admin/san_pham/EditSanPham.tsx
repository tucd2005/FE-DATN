import React, { useEffect } from 'react'
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  Space,
  Card,
  message,
} from 'antd'
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import type { UploadFile } from 'antd/es/upload/interface'
import { useListCategory as useCategoryList } from '../../../hooks/useCategory'
import { useList as useAttributeList } from '../../../hooks/useAttribute'
import { useProductDetail, useUpdateProduct } from '../../../hooks/useproduct'
import type { Category } from '../../../types/categorys/category'

const { TextArea } = Input

type AttributeValue = {
  thuoc_tinh_id: number
  gia_tri: string
}

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

  const { data: product } = useProductDetail(productId)
  const { data: categories = [] } = useCategoryList()
  const { data: attributes = [] } = useAttributeList()
  const updateProduct = useUpdateProduct()

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<FormData>({
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

  const { fields: variantFields, append, remove, replace } = useFieldArray({
    control,
    name: 'variants',
  })

  useEffect(() => {
    if (product && attributes.length > 0) {
      const defaultVariants: VariantInput[] = product.variants.map((v: any) => ({
        gia: v.gia,
        gia_khuyen_mai: v.gia_khuyen_mai,
        so_luong: v.so_luong,
        hinh_anh: v.hinh_anh
          ? [{
              uid: `preview-${v.id}`,
              name: 'Ảnh',
              url: `http://127.0.0.1:8000/storage/${v.hinh_anh}`
            } as UploadFile]
          : [],
        thuoc_tinh: attributes.map((attr) => {
          const matched = v.thuoc_tinh.find((t: any) => t.ten === attr.ten)
          return {
            thuoc_tinh_id: attr.id,
            gia_tri: matched?.gia_tri || '',
          }
        })
      }))

      reset({
        ten: product.ten,
        gia: product.variants[0]?.gia || '',
        gia_khuyen_mai: product.variants[0]?.gia_khuyen_mai || '',
        so_luong: product.so_luong,
        mo_ta: product.mo_ta,
        danh_muc_id: Number(product.danh_muc_id),
        hinh_anh: product.hinh_anh ? [{
          uid: '-1',
          name: 'Ảnh',
          url: `http://127.0.0.1:8000/storage/${product.hinh_anh}`
        }] as UploadFile[] : [],
        variants: defaultVariants,
      })
      replace(defaultVariants)
    }
  }, [product, attributes, reset, replace])
  const onSubmit = (data: FormData) => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('ten', data.ten || '')
    formData.append('gia', String(data.gia || 0))
    formData.append('gia_khuyen_mai', String(data.gia_khuyen_mai || 0))
    formData.append('so_luong', String(data.so_luong || 0))
    formData.append('mo_ta', data.mo_ta || '')
    formData.append('danh_muc_id', String(data.danh_muc_id || ''))

    //
    console.log('🧩 Biến thể trước khi gửi:');
    data.variants.forEach((variant, index) => {
      const img = variant.hinh_anh?.[0];
      console.log(`--- Biến thể ${index + 1} ---`);
      console.log('Ảnh:', img);
      console.log('  -> originFileObj:', img?.originFileObj);
      console.log('  -> url:', img?.url);
    });

    console.log('📦 Dữ liệu FormData gửi đi:');
for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}
    // Ảnh sản phẩm chính
    const mainImage = data.hinh_anh?.[0]
    if (mainImage?.originFileObj instanceof File) {
      formData.append('hinh_anh', mainImage.originFileObj)
    } else if (mainImage?.url) {
      const fileName = mainImage.url.split('/storage/')[1]
      if (fileName) formData.append('old_hinh_anh', fileName)
    }
  
    // Xử lý biến thể
    data.variants.forEach((variant, index) => {
      formData.append(`variants[${index}][gia]`, String(variant.gia))
      formData.append(`variants[${index}][gia_khuyen_mai]`, String(variant.gia_khuyen_mai || 0))
      formData.append(`variants[${index}][so_luong]`, String(variant.so_luong))
  
      const image = variant.hinh_anh?.[0]

      if (image && image.originFileObj && image.originFileObj instanceof File) {
        formData.append(`variants[${index}][hinh_anh]`, image.originFileObj)

        console.log(`✅ Đã append ảnh cho biến thể ${index}`);
      } else if (image?.url) {
        const fileName = image.url.split('/storage/')[1]
        if (fileName) {
          formData.append(`variants[${index}][old_hinh_anh]`, fileName)
          console.log(`🪄 Ảnh cũ biến thể ${index}:`, fileName)
        }
      } else {
        formData.append(`variants[${index}][remove_hinh_anh]`, '1')
        console.log(`⚠️ Không có ảnh biến thể ${index} => yêu cầu xóa`)
      }

      //
      console.log('✅ FormData cuối cùng:')
for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value)
}
      
      variant.thuoc_tinh.forEach((attr, attrIndex) => {
formData.append(`variants[${index}][attributes][${attrIndex}][thuoc_tinh_id]`, String(attr.thuoc_tinh_id))
formData.append(`variants[${index}][attributes][${attrIndex}][gia_tri]`, attr.gia_tri)
      })
    })
  
    updateProduct.mutate(
      { id: productId, data: formData },
      {
        onSuccess: () => {
          message.success('✅ Cập nhật thành công!')
          navigate('/admin/san-pham')
        },
        onError: (err) => {
          console.error(err)
          message.error('❌ Cập nhật thất bại!')
        }
      }
    )
  }
  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Cập nhật sản phẩm</h2>

      <Form.Item label="Tên sản phẩm">
        <Controller name="ten" control={control} render={({ field }) => <Input {...field} />} />
      </Form.Item>
      <Form.Item label="Tổng Số lượng">
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

      <Card title="Danh sách biến thể">
        {variantFields.map((variant, variantIndex) => (
          <Space key={variant.id} direction="vertical" className="w-full p-4 border rounded mb-4">
            <h4>Biến thể #{variantIndex + 1}</h4>

            <Controller name={`variants.${variantIndex}.gia`} control={control} render={({ field }) => <Input placeholder="Giá" {...field} />} />
            <Controller name={`variants.${variantIndex}.gia_khuyen_mai`} control={control} render={({ field }) => <Input placeholder="Giá KM" {...field} />} />
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
                    onChange={({ fileList }) => onChange(fileList.filter(f => f.status !== 'error'))}
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

          </Space>
        ))}
      </Card>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={updateProduct.isPending}>
          Lưu thay đổi
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditProduct