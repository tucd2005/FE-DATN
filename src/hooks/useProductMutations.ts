import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/productservice";
import { productKeys } from "./useProducts";
import type { Product } from "../types/product.type";

// Hook để tạo sản phẩm mới
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, unknown>) => productService.create(data),
    onSuccess: () => {
      // Invalidate và refetch tất cả product queries
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  });
};

// Hook để cập nhật sản phẩm
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      productService.update(id, data),
    onSuccess: (updatedProduct) => {
      // Update cache cho product detail
      queryClient.setQueryData(
        productKeys.detail(updatedProduct.id),
        updatedProduct
      );

      // Invalidate product lists để refetch
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });
};

// Hook để xóa sản phẩm
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productService.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove product detail từ cache
      queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });

      // Invalidate product lists để refetch
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
};

// Hook để bulk operations (nếu cần)
export const useBulkDeleteProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: number[]) =>
      Promise.all(ids.map((id) => productService.delete(id))),
    onSuccess: (_, deletedIds) => {
      // Remove tất cả product details từ cache
      deletedIds.forEach((id) => {
        queryClient.removeQueries({ queryKey: productKeys.detail(id) });
      });

      // Invalidate product lists để refetch
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error("Error bulk deleting products:", error);
    },
  });
};
