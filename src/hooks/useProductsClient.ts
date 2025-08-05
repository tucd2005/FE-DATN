import { useQuery } from "@tanstack/react-query";
import {
  productService,
  type ProductFilterParams,
} from "../services/productservice";

export const useProductsClient = (params: ProductFilterParams = {}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productService.filter(params),
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
  });
};

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
