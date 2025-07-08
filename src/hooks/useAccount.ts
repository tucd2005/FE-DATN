import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { accountService, staffService } from '../services/account'
import { toast } from 'react-toastify'

export const useAccountList = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: accountService.getAll,
  })
}
export const useAccountListuser = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: accountService.getAlluser,
  })

}

export const useBlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: any }) =>
      accountService.block(id, data),

    onSuccess: () => {
      toast.success("Khóa tài khoản thành công");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },

    onError: () => {
      toast.error("Khóa tài khoản thất bại");
    },
  });
};

export const useUnblockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => accountService.unblock(id),
    onSuccess: () => {
      toast.success("Mở khóa tài khoản thành công");
      queryClient.invalidateQueries({ queryKey: ["accounts"] }); // tự refetch danh sách
    },
    onError: () => {
      toast.error("Mở khóa tài khoản thất bại");
    },
  });
};



// Hook lấy danh sách staff
export const useStaffList = (page: number = 1, perPage: number = 10) => {
  return useQuery({
    queryKey: ['staffs', page, perPage],
    queryFn: () => staffService.getAll(page, perPage),
    placeholderData: (previousData) => previousData, 
  });
};

export const useBlockstaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: any }) =>
      staffService.block(id, data),
    onSuccess: () => {
      toast.success("Khóa tài khoản thành công");
      // ✅ đúng queryKey cần invalidate
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
    onError: () => {
      toast.error("Khóa tài khoản thất bại");
    },
  });
};

export const useUnblockstaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => staffService.unblock(id),
    onSuccess: () => {
      toast.success("Mở khóa tài khoản thành công");
      // ✅ đúng queryKey
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
    onError: () => {
      toast.error("Mở khóa tài khoản thất bại");
    },
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      so_dien_thoai: string;
      password: string;
      ngay_sinh?: string;
    }) => staffService.create(data),
    onSuccess: () => {
      toast.success("Thêm nhân viên thành công");
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
    onError: () => {
      toast.error("Thêm nhân viên thất bại");
    },
  });
};