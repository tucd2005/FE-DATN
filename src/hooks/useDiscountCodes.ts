import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDiscountCode, getDeletedDiscountCodes, getDiscountCodeDetail, getDiscountCodes, restoreDiscountCode, softDeleteDiscountCode, updateDiscountCode, updateDiscountCodeStatus } from "../services/discountCode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


// hook gọi API lấy danh sách mã giảm giá
export const useDiscountCodes = (page = 1) => {
  return useQuery({
    queryKey: ["discountCodes", page],
    queryFn: () => getDiscountCodes(page),
    placeholderData: keepPreviousData,  // ✅ v5 dùng placeholderData
  });
};

export const useCreateDiscountCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDiscountCode,
    onSuccess: () => {
      toast.success("Tạo mã giảm giá thành công!");
      queryClient.invalidateQueries({ queryKey: ["discountCodes"] }); // load lại danh sách
    },
    onError: () => {
      toast.error("Tạo mã giảm giá thất bại!");
    },
  });
};
export const useUpdateDiscountCode = () => {
  const queryClient = useQueryClient();
const nav= useNavigate();
  return useMutation({
    mutationFn: updateDiscountCode,
    onSuccess: (res) => {
      toast.success(res.toast || "Cập nhật thành công!");
      queryClient.invalidateQueries({ queryKey: ["discountCodes"] });
      nav("/admin/ma-giam-gia"); // điều hướng về trang danh sách
    },
    onError: () => {
      toast.error("Cập nhật thất bại!");
    },
  });
};

export const useDiscountCodeDetail = (id: number) => {
  return useQuery({
    queryKey: ["discountCodeDetail", id],
    queryFn: () => getDiscountCodeDetail(id),
    enabled: !!id, // chỉ gọi khi có id
  });
};
export const useUpdateDiscountCodeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: boolean }) =>
      updateDiscountCodeStatus(id, status),
    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công!");
      queryClient.invalidateQueries({ queryKey: ["discountCodes"] });
    },
    onError: () => {
      toast.error("Cập nhật trạng thái thất bại!");
    }
  });
};
// Hook xóa mềm
export const useSoftDeleteDiscountCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => softDeleteDiscountCode(id),
    onSuccess: () => {
      toast.success("Xóa thành công!");
      queryClient.invalidateQueries({ queryKey: ["discountCodes"] });
    },
    onError: () => {
      toast.error("Xóa thất bại!");
    }
  });
};

// Hook lấy danh sách đã xóa
export const useDeletedDiscountCodes = (page: number) => {
  return useQuery({
    queryKey: ["deletedDiscountCodes", page],
    queryFn: () => getDeletedDiscountCodes(page),
  });
};
export const useRestoreDiscountCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => restoreDiscountCode(id),
    onSuccess: () => {
      toast.success("Khôi phục thành công!");
      queryClient.invalidateQueries({ queryKey: ["deletedDiscountCodes"] });
      queryClient.invalidateQueries({ queryKey: ["discountCodes"] });
    },
    onError: () => {
      toast.error("Khôi phục thất bại!");
    },
  });
};

