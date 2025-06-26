import type { Account } from '../types/accouts'
import instanceAxios from '../utils/axios'


export const accountService = {
  getAll: async (): Promise<Account[]> => {
    const res = await instanceAxios.get('/admin/users/ad')
    return res.data.data || []
  }
}
