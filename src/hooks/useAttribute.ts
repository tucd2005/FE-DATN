import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { attributeService } from '../services/attribute'
import { toast } from 'react-toastify';

export const useList = () => {
  return useQuery({
    queryKey: ['attributes'],
    queryFn: attributeService.getAll,
  })
}
export const useCreateAttribute = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: attributeService.create,
    onSuccess: () => {
      toast.success('Thêm thuộc tính thành công');
      queryClient.invalidateQueries({ queryKey: ['attributes'] });
      
    },
    onError: () => {
      toast.error('Thêm thuộc tính thất bại');
    },
  });
};;
export const useDeleteAttribute = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: attributeService.delete,
    onSuccess: () => {
      toast.success('Xóa thuộc tính thành công');
      queryClient.invalidateQueries({ queryKey: ['attributes'] });
    },
    onError: () => {
      toast.error('Xóa thuộc tính thất bại');
    },
  });
};