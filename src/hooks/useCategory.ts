import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd"; // hoặc dùng toast từ react-toastify
import {
  createCategory,
  deleteCategory,
  forceDeleteCategory,
  getListCategory,
  getOneCategory,
  restoreCategory,
  updateCategory,
  categoryTrash,
} from "../services/categoryService";
import instanceAxios from "../utils/axios";

const RESOURCE = "admin/category";

// Lấy danh sách danh mục
export const useListCategory = (params?: {
  search?: string;
  page?: number;
}) => {
  return useQuery({
    queryKey: [RESOURCE, params],
    queryFn: async () => {
      const res = await getListCategory({ resource: RESOURCE, params });
      return res.data.data; // 👈 chỉ trả về mảng danh mục
    },
  });
};

// Lấy 1 danh mục theo ID
export const useOneCategory = (id: string | number) => {
  return useQuery({
    queryKey: ["RESOURCE", id],
    queryFn: async () => {
      const res = await instanceAxios.get(`admin/category/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};

// Thêm danh mục
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: FormData) =>
      createCategory({ resource: RESOURCE, values }),
    onSuccess: () => {
      message.success("Tạo danh mục thành công");
      queryClient.invalidateQueries({ queryKey: [RESOURCE] });
    },
    onError: () => {
      message.error("Tạo danh mục thất bại");
    },
  });
};

// Cập nhật danh mục
export const useUpdateCategory = (id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: FormData) =>
      updateCategory({ resource: RESOURCE, id, values }),
    onSuccess: () => {
      message.success("Cập nhật danh mục thành công");
      queryClient.invalidateQueries({ queryKey: [RESOURCE] });
    },
    onError: () => {
      message.error("Cập nhật thất bại");
    },
  });
};

// Xoá mềm
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) =>
      deleteCategory({ resource: RESOURCE, id }),
    onSuccess: () => {
      message.success("Xoá thành công");
      queryClient.invalidateQueries({ queryKey: [RESOURCE] });
    },
    onError: () => {
      message.error("Xoá thất bại");
    },
  });
};

// Khôi phục
export const useRestoreCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) =>
      restoreCategory({ resource: RESOURCE, id }),
    onSuccess: () => {
      message.success("Khôi phục thành công");
      queryClient.invalidateQueries({ queryKey: [RESOURCE] });
    },
    onError: () => {
      message.error("Khôi phục thất bại");
    },
  });
};

// Xoá vĩnh viễn
export const useForceDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) =>
      forceDeleteCategory({ resource: RESOURCE, id }),
    onSuccess: () => {
      message.success("Xoá vĩnh viễn thành công");
      queryClient.invalidateQueries({ queryKey: [RESOURCE] });
    },
    onError: () => {
      message.error("Xoá vĩnh viễn thất bại");
    },
  });
};

// Lấy danh sách danh mục đã xóa
export const useTrashedCategories = () => {
  return useQuery({
    queryKey: ["categories", "trashed"],
    queryFn: async () => {
      const res = await categoryTrash.list();
      return res.data?.data ?? [];
    },
  });
};

// Khôi phục danh mục từ thùng rác
export const useRestoreCategoryFromTrash = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoryTrash.restore(id),
    onSuccess: () => {
      message.success("Khôi phục danh mục thành công");
      queryClient.invalidateQueries({ queryKey: ["categories", "trashed"] });
      queryClient.invalidateQueries({ queryKey: [RESOURCE] });
    },
    onError: () => {
      message.error("Khôi phục danh mục thất bại");
    },
  });
};

// Xóa vĩnh viễn danh mục từ thùng rác
export const useForceDeleteCategoryFromTrash = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoryTrash.forceDelete(id),
    onSuccess: () => {
      message.success("Xóa vĩnh viễn danh mục thành công");
      queryClient.invalidateQueries({ queryKey: ["categories", "trashed"] });
    },
    onError: () => {
      message.error("Xóa vĩnh viễn danh mục thất bại");
    },
  });
};
