
import instanceAxios from "../utils/axios";

// ✅ Kiểu dữ liệu profile
export interface Profile {
  id: number;
  name: string;
  email: string;
  so_dien_thoai: string | null;
  email_verified_at: string | null;
  ngay_sinh: string | null;
  gioi_tinh: string | null;
  anh_dai_dien: string | null;
  vai_tro_id: number;
  trang_thai: string;
  ly_do_block: string | null;
  block_den_ngay: string | null;
  kieu_block: string | null;
  created_at: string;
  updated_at: string;
}

// ✅ Lấy thông tin profile
export const getProfile = async (): Promise<Profile> => {
  const res = await instanceAxios.get("/client/profile");
  return res.data;
};


// ✅ Cập nhật thông tin profile
export const updateProfile = async (data: Partial<Profile>): Promise<Profile> => {
  const res = await instanceAxios.put("/client/profile", data);
  return res.data;
};
