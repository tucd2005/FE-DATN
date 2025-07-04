import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { attributeService, createAttributeValue, getAttributeValueById, getAttributeValuesByAttributeId, getDeletedAttributeValuesByAttributeId, restoreAttributeValue, softDeleteAttributeValue, updateAttributeValue } from '../services/attribute'
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

// Hook lấy danh sách giá trị thuộc tính
export const useAttributeValueList = (attributeId: number) => {
  return useQuery({
    queryKey: ["attribute-values", attributeId],
    queryFn: () => getAttributeValuesByAttributeId(attributeId),
    enabled: !!attributeId, // chỉ chạy khi attributeId có giá trị
  });
};

// Hook thêm giá trị thuộc tính
export const useCreateAttributeValue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ attributeId, gia_tri }: { attributeId: number; gia_tri: string }) =>
      createAttributeValue(attributeId, gia_tri),

    onSuccess: (data) => {
      toast.success("Thêm giá trị thành công!");
      queryClient.invalidateQueries({
        queryKey: ["attribute-values", data.thuoc_tinh_id] as const
      });
    },
    onError: (error) => {
      console.error("Lỗi khi thêm giá trị:", error);
      toast.error("Thêm giá trị thất bại!");
    },
  });
};

export const useUpdateAttributeValue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, gia_tri }: { id: number; gia_tri: string }) =>
      updateAttributeValue(id, gia_tri),

    onSuccess: (data) => {
      toast.success("Cập nhật thành công!");
      queryClient.invalidateQueries({
        queryKey: ["attribute-values", data.thuoc_tinh_id] as const
      });
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật:", error);
      toast.error("Cập nhật thất bại!");
    },
  });
};


export const useAttributeValueDetail = (id: number) => {
  return useQuery({
    queryKey: ["attribute-value", id],
    queryFn: () => getAttributeValueById(id),
    enabled: !!id, // chỉ chạy khi id tồn tại
  });
};

export const useSoftDeleteAttributeValue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => softDeleteAttributeValue(id),
    onSuccess: (_, id) => {
      toast.success("Xoá thành công!");
      // invalidate list attribute-values của thuộc tính cha
      queryClient.invalidateQueries({ queryKey: ["attribute-values"] });
    },
    onError: () => {
      toast.error("Xoá thất bại!");
    },
  });
};

// Lấy danh sách đã xoá mềm
export const useDeletedAttributeValues = (attributeId: number) => {
  return useQuery({
    queryKey: ["deleted-attribute-values", attributeId],
    queryFn: () => getDeletedAttributeValuesByAttributeId(attributeId),
    enabled: !!attributeId,
  });
};
export const useRestoreAttributeValue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => restoreAttributeValue(id),
    onSuccess: (_, id) => {
      toast.success("Khôi phục thành công!");
      // invalidate list deleted & list active
      queryClient.invalidateQueries({ queryKey: ["deleted-attribute-values"] });
      queryClient.invalidateQueries({ queryKey: ["attribute-values"] });
    },
    onError: () => {
      toast.error("Khôi phục thất bại!");
    },
  });
};

// Nhận mảng attributeIds, trả về mảng kết quả
export const useAllAttributeValues = (attributeIds: number[]) => {
  return useQueries({
    queries: attributeIds.map(id => ({
      queryKey: ['attribute-values', id],
      queryFn: () => getAttributeValuesByAttributeId(id),
    }))
  });
};