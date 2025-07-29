import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "../services/productservice";
import type { Product } from "../types/product.type";

// Query keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};

// Hook để lấy tất cả sản phẩm
export const useProducts = () => {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: () => productService.getAll(),
  });
};

// Hook để lấy sản phẩm có phân trang
export const useProductsPaginated = (params: Record<string, unknown> = {}) => {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productService.getPaginated(params),
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút (trước đây là cacheTime)
  });
};

// Hook để filter sản phẩm
export const useProductsFilter = (filters: Record<string, unknown> = {}) => {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productService.filter(filters),
    staleTime: 2 * 60 * 1000, // 2 phút
    gcTime: 5 * 60 * 1000, // 5 phút
  });
};

// Hook để lấy chi tiết sản phẩm
export const useProductDetail = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productService.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 phút
    gcTime: 15 * 60 * 1000, // 15 phút
  });
};

// Hook để lấy sản phẩm liên quan
export const useRelatedProducts = (id: number) => {
  return useQuery({
    queryKey: [...productKeys.detail(id), "related"],
    queryFn: () => productService.getRelated(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
  });
};

// Hook để infinite scroll (nếu cần)
export const useProductsInfinite = (filters: Record<string, unknown> = {}) => {
  return useInfiniteQuery({
    queryKey: [...productKeys.list(filters), "infinite"],
    queryFn: ({ pageParam = 1 }) =>
      productService.filter({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page < lastPage.meta.last_page) {
        return lastPage.meta.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000, // 2 phút
    gcTime: 5 * 60 * 1000, // 5 phút
  });
};
