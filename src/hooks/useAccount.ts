import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { accountService } from '../services/account'
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