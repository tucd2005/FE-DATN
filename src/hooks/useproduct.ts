import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  productService,
  productadd,
  productdelete,
  productDetailService,
  producttrash,
  productupdate,
  productlist,
  productServiceAdmin,
  productServiceclient,
} from "../services/productservice";
import type { Product } from "../types/product.type";
import { toast } from "react-toastify";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: productService.getAll,
    initialData: [],
  });
};
export const useProductsAdmin = (
  page: number,
  filters: { keyword?: string; ten_danh_muc?: string; gia_tu?: number; gia_den?: number }
) => {
  return useQuery({
    queryKey: ["products", page, filters], // thêm filters vào key để refetch khi thay đổi
    queryFn: () => productServiceAdmin.getAllAdmin(page, filters),
    placeholderData: keepPreviousData,
  });
};

export const useProductsadmin = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: productlist.getAll,
    initialData: [],
  });
};

export const useProductDetail = (id: number) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => productDetailService.getById(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => productadd.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      console.error(
        "Lỗi khi thêm sản phẩm:",
        error.response?.data || error.message
      );
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productdelete.softDelete(id),
    onSuccess: () => {
      toast.success(
        "🗑️ Đã xoá sản phẩm (xoá mềm, có thể khôi phục trong Thùng rác)"
      );
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("❌ Xoá sản phẩm thất bại!");
    },
  });
};
export const useForceDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productdelete.forceDelete(id),
    onSuccess: () => {
      toast.success("🗑️ Đã xoá vĩnh viễn sản phẩm");
      queryClient.invalidateQueries({ queryKey: ["products", "trashed"] });
    },
    onError: () => {
      toast.error(" Xoá thất bại");
    },
  });
};

export const useTrashedProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products", "trashed"],
    queryFn: async () => {
      const res = await producttrash.list();
      console.log("Trashed products raw response:", res.data);
      return res.data?.data ?? []; // fix nếu data bị undefined
    },
  });
};

export const useRestoreProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => producttrash.restore(id),
    onSuccess: () => {
      toast.success(" Khôi phục sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["products", "trashed"] });
    },
    onError: () => {
      toast.error(" Khôi phục thất bại");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      productupdate.update(id, data),
    onSuccess: () => {
      toast.success("Cập nhật sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      console.error(
        "Lỗi khi cập nhật sản phẩm:",
        error.response?.data || error.message
      );
      toast.error("Cập nhật sản phẩm thất bại!");
    },
  });
};
export const useRelatedProducts = (productId: number | undefined) => {
  return useQuery({
    queryKey: ["related-products", productId],
    queryFn: () => productId ? productServiceclient.getRelatedProducts(productId).then(res => res.data.data) : [],
    enabled: !!productId, // chỉ gọi nếu có productId
  });
};