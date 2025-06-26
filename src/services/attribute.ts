import instanceAxios from '../utils/axios'

export const attributeService = {
  getAll: async () => {
    const res = await instanceAxios.get('/attributes')  // endpoint phải đúng với backend
    return res.data?.data || []
  },
}