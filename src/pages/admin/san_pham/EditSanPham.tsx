import React, { useEffect } from 'react'
import {
  Form, Input, Button, Upload, Select, message
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useForm, Controller } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import type { UploadFile } from 'antd/es/upload/interface'
import { useListCategory as useCategoryList } from '../../../hooks/useCategory'
import { useProductDetail, useUpdateProduct } from '../../../hooks/useProduct'
import type { Category } from '../../../types/categorys/category'
import { useQueryClient } from '@tanstack/react-query'

const { TextArea } = Input

type FormData = {
  ten: string
  gia: string
  gia_khuyen_mai: string
  so_luong: number
  mo_ta: string
  danh_muc_id: number
  hinh_anh?: UploadFile[]
}

const EditProduct: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const productId = Number(id)
  const queryClient = useQueryClient();
  const { data: product, isLoading } = useProductDetail(productId);

  const { data: categories = [] } = useCategoryList()
  const updateProduct = useUpdateProduct()

  const { control, handleSubmit, reset   } = useForm<FormData>({
    defaultValues: {
      ten: '',
      gia: '',
      gia_khuyen_mai: '',
      so_luong: 0,
      mo_ta: '',
      danh_muc_id: 0,
      hinh_anh: [],
    },
  })

  // Load data vào form khi đã sẵn sàng
  useEffect(() => {
    if (!product) return

    reset({
      ten: product.ten,
      gia: String(product.gia || ''),
      gia_khuyen_mai: String(product.gia_khuyen_mai || ''),
      so_luong: product.so_luong,
      mo_ta: product.mo_ta,
      danh_muc_id: Number(product.danh_muc_id),
      hinh_anh: product.hinh_anh ? [{
        uid: '-1', name: 'Ảnh',
        url: `http://127.0.0.1:8000/storage/${product.hinh_anh}`
      }] : [],
    })
  }, [product, reset])

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

      {/* <Form.Item label="Tổng số lượng">
        <Controller name="so_luong" control={control} render={({ field }) => <Input {...field} />} />
      </Form.Item> */}

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

    

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={updateProduct.isPending}>
          Lưu thay đổi
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditProduct
