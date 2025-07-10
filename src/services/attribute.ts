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

// Lấy danh sách giá trị thuộc tính theo thuộc tính
export const getAttributeValuesByAttributeId = async (id: number) => {
  const response = await instanceAxios.get(`admin/attribute-values/attribute/${id}`);
  return response.data.data; 
};


export const createAttributeValue = async (attributeId: number, gia_tri: string) => {
  const response = await instanceAxios.post(
    `/admin/attribute-values/attribute/${attributeId}`,
    { gia_tri }
  );
  return response.data.data;
};
export const updateAttributeValue = async (id: number, gia_tri: string) => {
  const response = await instanceAxios.put(
    `/admin/attribute-values/${id}`,
    { gia_tri }
  );
  return response.data.data;
};

export const getAttributeValueById = async (id: number) => {
  const response = await instanceAxios.get(`/admin/attribute-values/${id}`);
  return response.data.data;
};

export const softDeleteAttributeValue = async (id: number) => {
  const response = await instanceAxios.delete(`/admin/attribute-values/${id}`);
  return response.data;
};

// Lấy list đã xoá mềm (backend phải cung cấp endpoint này)
export const getDeletedAttributeValuesByAttributeId = async (attributeId: number) => {
  const response = await instanceAxios.get(`/admin/attribute-values/trash/list`);
  return response.data.data;
};
export const restoreAttributeValue = async (id: number) => {
  const response = await instanceAxios.post(`/admin/attribute-values/restore/${id}`);
  return response.data;
};

