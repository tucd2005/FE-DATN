import type { Account } from '../types/accouts'
import instanceAxios from '../utils/axios'


export const accountService = {
  getAll: async (): Promise<Account[]> => {
    const res = await instanceAxios.get('/admin/users/ad')
    return res.data.data || []
  },
  getAlluser: async (): Promise<Account[]> => {
    const res = await instanceAxios.get('/admin/users/cus')
    return res.data.data || []
  },
  block: async (id: number | string, data: { ly_do_block?: string, block_den_ngay?: string | null }) => {
    const res = await instanceAxios.patch(`/admin/users/${id}/block`, data)
    return res.data?.data
  },
  unblock: async (id: number | string) => {
    const res = await instanceAxios.post(`/admin/users/${id}/unblock`);
    return res.data?.data;
  }, 
}
