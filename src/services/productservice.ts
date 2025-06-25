  import type { Product, ProductInput } from '../types/product.type'
  import instanceAxios from '../utils/axios'

  export const productService = {
    getAll: async (): Promise<Product[]> => {
      const res = await instanceAxios.get('/products')
      return res.data?.data || []
    },
  }


  export const productdetails = {
    getById: async (id: number): Promise<Product> => {
      const res = await instanceAxios.get(`/products/${id}`)
      return res.data?.data
    },
  }

  export const productadd = {
    create: async (data: FormData | ProductInput) => {
      const res = await instanceAxios.post('/admin/products', data)
      return res.data?.data
    }
  }

  export const productdelete = {
    softDelete: (id: number) => instanceAxios.delete(`/admin/products/${id}`),
    forceDelete: (id: number) => instanceAxios.delete(`/admin/products/force-delete/${id}`),
  }
  export const producttrash = {
    list: () => instanceAxios.get('/admin/products/trash'), // ✅ sửa đúng route
    restore: (id: number) => instanceAxios.patch(`/admin/products/restore/${id}`),
  };
