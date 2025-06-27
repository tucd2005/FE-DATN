import instanceAxios from '../utils/axios'

export const attributeService = {
  getAll: async () => {
    const res = await instanceAxios.get('/admin/attributes')  // endpoint phải đúng với backend
    return res.data?.data || []
  },
}