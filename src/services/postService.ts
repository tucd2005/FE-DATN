// services/postService.ts

import instanceAxios from "../utils/axios";

export interface Post {
  id: number;
  tieu_de: string;
  mo_ta_ngan: string;
  noi_dung: string;
  anh_dai_dien: string | null;
  trang_thai: string;
  created_at: string;
  updated_at: string;
}

export interface PostListResponse {
  current_page: number;
  data: Post[];
  total: number;
  per_page: number;
}

export const postService = {
  getAll: async (page: number = 1, search: string = "") => {
    const res = await instanceAxios.get<PostListResponse>("/admin/posts", {
      params: {
        page,
        search,
      },
    });
    return res.data;
  },

  getById: async (id: number) => {
    const res = await instanceAxios.get<Post>(`/admin/posts/${id}`);
    return res.data;
  },

  create: async (data: any) => {
    const res = await instanceAxios.post("/admin/posts", data);
    return res.data;
  },

  update: async (id: number, data: any) => {
    const res = await instanceAxios.post(`/admin/posts/${id}`, data);
    return res.data;
  },

  delete: async (id: number) => {
    const res = await instanceAxios.delete(`/admin/posts/${id}`);
    return res.data;
  },
};
