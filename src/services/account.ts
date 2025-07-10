import type { Account } from '../types/accouts'
import instanceAxios from '../utils/axios'
export interface Staff {
  id: number;
  name: string;
  email: string;
  so_dien_thoai: string;
  anh_dai_dien: string | null;
  trang_thai: string;
  vai_tro_id: number;
  ten_vai_tro: string;
  created_at: string;
  updated_at: string;
  role?: Role; // mới thêm
}
export interface Role {
  id: number;
  ten_vai_tro: string;
  mo_ta: string | null;
  created_at: string;
  updated_at: string;
}
export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

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
///
export const staffService = {
  getAll: async (page: number = 1, perPage: number = 10): Promise<{ data: Staff[]; pagination: Pagination }> => {
    const res = await instanceAxios.get("/admin/users/staff", {params: {role: "staff",page,per_page: perPage,},});
    return res.data;
  },

 block: async (id: number | string, data: { ly_do_block?: string, block_den_ngay?: string | null }) => {
    const res = await instanceAxios.patch(`/admin/users/${id}/block`, data)
    return res.data?.data
  },
  unblock: async (id: number | string) => {
    const res = await instanceAxios.post(`/admin/users/${id}/unblock`);
    return res.data?.data;
  }, 
  create: async (data: {name: string;email: string;so_dien_thoai: string;password: string;ngay_sinh?: string;}) => {
  const res = await instanceAxios.post<{message: string; status: number;data: Staff;}>("/admin/users", data);
  return res.data.data; // trả về staff mới tạo
},
};