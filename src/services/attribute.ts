import instanceAxios from '../utils/axios';

export const attributeService = {
  getAll: async () => {
    const res = await instanceAxios.get('/admin/attributes');
    return res.data?.data || [];
  },
  create: async (data) => {
    const res = await instanceAxios.post('/admin/attributes', data);
    return res.data;
  },
  update: async (id: number | string, data: any) => {
    const res = await instanceAxios.post(`/admin/attributes/${id}`, data); 
    // SỬA: dùng POST thay vì PATCH, thêm /admin vào URL
    return res.data?.data;
  },
  delete: async (id) => {
    const res = await instanceAxios.delete(`/admin/attributes/${id}`);
    return res.data;
  },
  getById: async (id: string) => {
    const res = await instanceAxios.get(`/admin/attributes/${id}`);
    return res.data?.data;
  },
  getDeletedList: async (params?: Record<string, any>) => {
    const res = await instanceAxios.get("/admin/attributes/deleted", { params });
    return res.data?.data || res.data || [];
  },
  restore: async (id: number) => {
    const res = await instanceAxios.patch(`/admin/attributes/restore/${id}`);
    return res.data;
  },
  forceDelete: async (id: number) => {
    const res = await instanceAxios.delete(`/admin/attributes/force-delete/${id}`);
    return res.data;
  },
};
