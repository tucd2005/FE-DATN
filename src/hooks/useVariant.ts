// src/hooks/useVariant.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { variantService } from "../services/variantService";
import type { VariantInput } from "../types/variant.type";

export const useVariantByProduct = (productId: number) => {
  return useQuery({
    queryKey: ["variants", productId],
    queryFn: () => variantService.getByProductId(productId),
  });
};

export const useDeletedVariantByProduct = (productId: number) => {
  return useQuery({
    queryKey: ["variants-deleted", productId],
    queryFn: () => variantService.getDeletedByProductId(productId),
  });
};

export const useVariantById = (id: number) => {
  return useQuery({
    queryKey: ["variant", id],
    queryFn: () => variantService.getById(id),
  });
};

export const useCreateVariant = (productId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VariantInput) => variantService.create(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["variants", productId]);
    },
  });
};

export const useUpdateVariant = (id: number, productId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: VariantInput) => variantService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["variants", productId]);
      queryClient.invalidateQueries(["variant", id]);
    },
  });
};

export const useDeleteVariant = (productId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => variantService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["variants", productId]);
      queryClient.invalidateQueries(["variants-deleted", productId]);
    },
  });
};

export const useForceDeleteVariant = (productId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => variantService.forceDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["variants-deleted", productId]);
    },
  });
};

export const useRestoreVariant = (productId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => variantService.restore(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["variants", productId]);
      queryClient.invalidateQueries(["variants-deleted", productId]);
    },
  });
};
