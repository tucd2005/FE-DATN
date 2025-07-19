import instanceAxios from "../utils/axios";

export interface Banner {
  id: number;
  tieu_de: string;
  hinh_anh: string;
  trang_thai: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export const bannerService = {
    getAll: () => instanceAxios.get("/admin/banner"),
    getById: (id: number | string) =>
      instanceAxios.get(`/admin/banner/${id}`),
    create: (data: FormData) =>
      instanceAxios.post("/admin/banner", data),
    update: (id: number, data: FormData) =>
      instanceAxios.put(`/admin/banner/${id}`, data),
    delete: (id: number) => instanceAxios.delete(`/admin/banner/${id}`),
};