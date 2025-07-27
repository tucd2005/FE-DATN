// hooks/usePost.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "../services/postService";
import { toast } from "react-toastify";

export const usePosts = (page: number = 1, search: string = "") => {
  return useQuery({
    queryKey: ["posts", page, search],
    queryFn: () => postService.getAll(page, search),
  });
};

export const usePostDetail = (id: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => postService.getById(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postService.create,
    onSuccess: () => {
      toast.success("thêm thành công")
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// hooks/usePost.ts
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      postService.update(id, data),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });
};


export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postService.delete,
    onSuccess: () => {
      toast.success("xóa thành công")
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
