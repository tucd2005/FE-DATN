import { useQuery } from "@tanstack/react-query"
import { getProducts, productService, type GetProductsParams } from "../../providers/productservice"


export const useProducts = (params?: GetProductsParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  })
}
export const useProductDetail = (id: number) => {
  return useQuery({
    queryKey: ["product-detail", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  })
}
