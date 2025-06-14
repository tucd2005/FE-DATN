import type { Product } from "../types/product.type"
import instanceAxios from "../utils/axios"

export interface GetProductsParams {
  page?: number
  limit?: number
  sort?: string
  search?: string
  category?: string
}

export const getProducts = async (params?: GetProductsParams): Promise<Product[]> => {
  const response = await instanceAxios.get("/products", { params })
  return response.data
}
    
export const productService = {
  getById: (id: number) => instanceAxios.get(`/products/${id}`),

  addToCart: (data: {
    productId: number
    quantity: number
    size: string
    color: string
  }) => instanceAxios.post("/cart", data),
}