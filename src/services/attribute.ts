import instanceAxios from '../utils/axios'

export const attributeService = {
  getAll: async () => {
    const res = await instanceAxios.get('/admin/attributes')  // endpoint phải đúng với backend
    return res.data?.data || []
  },
  create: async (data) => {
    const res = await instanceAxios.post('/admin/attributes', data);
    return res.data;
  },
  delete: async (id) => {
    const res = await instanceAxios.delete(`/admin/attributes/${id}`);
    return res.data;
  },
}