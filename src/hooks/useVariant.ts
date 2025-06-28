import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { variantService } from "../services/variantService";
import type { VariantInput, VariantUpdateInput } from "../types/variant.type";

const RESOURCE = "variants";

// Lấy danh sách biến thể theo sản phẩm
export const useVariantsByProduct = (productId: number) => {
  return useQuery({
    queryKey: [RESOURCE, "product", productId],
    queryFn: () => variantService.getByProductId(productId),
    enabled: !!productId,
    initialData: [],
  });
};

// Lấy chi tiết biến thể
export const useVariantDetail = (id: number) => {
  return useQuery({
    queryKey: [RESOURCE, id],
    queryFn: () => variantService.getById(id),
    enabled: !!id,
  });
};

// Lấy danh sách biến thể đã xóa theo sản phẩm
export const useDeletedVariantsByProduct = (productId: number) => {
  return useQuery({
    queryKey: [RESOURCE, "deleted", "product", productId],
    queryFn: () => variantService.getDeletedByProductId(productId),
    enabled: !!productId,
    initialData: [],
  });
};

// Tạo biến thể mới
export const useCreateVariant = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VariantInput) => variantService.create(productId, data),
    onSuccess: () => {
      message.success("Tạo biến thể thành công");
      queryClient.invalidateQueries({
        queryKey: [RESOURCE, "product", productId],
      });
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
    },
    onError: (error: unknown) => {
      const errorResponse = error as {
        response?: { data?: { message?: string } };
      };
      const errorMessage =
        errorResponse?.response?.data?.message || "Tạo biến thể thất bại";
      message.error(errorMessage);
    },
  });
};

// Cập nhật biến thể
export const useUpdateVariant = (id: number, productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VariantUpdateInput) => variantService.update(id, data),
    onSuccess: () => {
      message.success("Cập nhật biến thể thành công");
      queryClient.invalidateQueries({ queryKey: [RESOURCE, id] });
      queryClient.invalidateQueries({
        queryKey: [RESOURCE, "product", productId],
      });
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
    },
    onError: (error: unknown) => {
      const errorResponse = error as {
        response?: { data?: { message?: string } };
      };
      const errorMessage =
        errorResponse?.response?.data?.message || "Cập nhật biến thể thất bại";
      message.error(errorMessage);
    },
  });
};

// Xóa mềm biến thể
export const useDeleteVariant = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => variantService.delete(id),
    onSuccess: () => {
      message.success("Xóa biến thể thành công");
      queryClient.invalidateQueries({
        queryKey: [RESOURCE, "product", productId],
      });
      queryClient.invalidateQueries({
        queryKey: [RESOURCE, "deleted", "product", productId],
      });
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
    },
    onError: () => {
      message.error("Xóa biến thể thất bại");
    },
  });
};

// Xóa mềm tất cả biến thể của sản phẩm
export const useDeleteAllVariantsByProduct = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => variantService.deleteByProductId(productId),
    onSuccess: () => {
      message.success("Xóa tất cả biến thể thành công");
      queryClient.invalidateQueries({
        queryKey: [RESOURCE, "product", productId],
      });
      queryClient.invalidateQueries({
        queryKey: [RESOURCE, "deleted", "product", productId],
      });
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
    },
    onError: () => {
      message.error("Xóa tất cả biến thể thất bại");
    },
  });
};

// Khôi phục biến thể
export const useRestoreVariant = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => variantService.restore(id),
    onSuccess: () => {
      message.success("Khôi phục biến thể thành công");
      queryClient.invalidateQueries({
        queryKey: [RESOURCE, "product", productId],
      });
      queryClient.invalidateQueries({
        queryKey: [RESOURCE, "deleted", "product", productId],
      });
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
    },
    onError: () => {
      message.error("Khôi phục biến thể thất bại");
    },
  });
};

// Khôi phục tất cả biến thể của sản phẩm
export const useRestoreAllVariantsByProduct = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => variantService.restoreByProductId(productId),
    onSuccess: () => {
      message.success("Khôi phục tất cả biến thể thành công");
      queryClient.invalidateQueries({
        queryKey: [RESOURCE, "product", productId],
      });
      queryClient.invalidateQueries({
        queryKey: [RESOURCE, "deleted", "product", productId],
      });
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
    },
    onError: () => {
      message.error("Khôi phục tất cả biến thể thất bại");
    },
  });
};

// Xóa vĩnh viễn biến thể
export const useForceDeleteVariant = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => variantService.forceDelete(id),
    onSuccess: () => {
      message.success("Xóa vĩnh viễn biến thể thành công");
      queryClient.invalidateQueries({
        queryKey: [RESOURCE, "deleted", "product", productId],
      });
    },
    onError: () => {
      message.error("Xóa vĩnh viễn biến thể thất bại");
    },
  });
};

// Xóa vĩnh viễn tất cả biến thể của sản phẩm
export const useForceDeleteAllVariantsByProduct = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => variantService.forceDeleteByProductId(productId),
    onSuccess: () => {
      message.success("Xóa vĩnh viễn tất cả biến thể thành công");
      queryClient.invalidateQueries({
        queryKey: [RESOURCE, "deleted", "product", productId],
      });
    },
    onError: () => {
      message.error("Xóa vĩnh viễn tất cả biến thể thất bại");
    },
  });
};
