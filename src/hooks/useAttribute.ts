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
export const useUpdateAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: any }) =>
      attributeService.update(id, data),
    onSuccess: () => {
      toast.success("Cập nhật thuộc tính thành công");
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
    onError: () => {
      toast.error("Cập nhật thuộc tính thất bại");
    },
  });
};
export const useAttributeDetail = (id: string) => {
  return useQuery({
    queryKey: ["attributes", id],
    queryFn: () => attributeService.getById(id),
    enabled: !!id, // chỉ chạy khi có id
  });
};
export const useDeletedAttributeList = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["attributes-deleted", params],
    queryFn: () => attributeService.getDeletedList(params),
  });
};
export const useRestoreAttributeFromTrash = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => attributeService.restore(id),
    onSuccess: () => {
      toast.success("Khôi phục thuộc tính thành công");
      queryClient.invalidateQueries({ queryKey: ["attributes-deleted"] });
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
    onError: () => {
      toast.error("Khôi phục thuộc tính thất bại");
    },
  });
};

// Hook xóa vĩnh viễn thuộc tính đã xóa mềm
export const useForceDeleteAttributeFromTrash = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => attributeService.forceDelete(id),
    onSuccess: () => {
      toast.success("Xóa vĩnh viễn thuộc tính thành công");
      queryClient.invalidateQueries({ queryKey: ["attributes-deleted"] });
    },
    onError: () => {
      toast.error("Xóa vĩnh viễn thuộc tính thất bại");
    },
  });
};