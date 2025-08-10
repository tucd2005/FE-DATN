// src/services/profileService.ts
import instanceAxios from "../utils/axios";

export interface Profile {
  id: number;
  name: string;
  email: string;
  so_dien_thoai?: string;
  gioi_tinh?: "nam" | "nu" | "khac";
  ngay_sinh?: string;
  anh_dai_dien?: string;
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
  so_dien_thoai?: string;
  gioi_tinh?: "nam" | "nu" | "khac";
  ngay_sinh?: string; // luôn gửi dạng YYYY-MM-DD
  password?: string;
  password_confirmation?: string;
  anh_dai_dien?: File | null;
}

export const profileService = {
  getProfile: async () => {
    const res = await instanceAxios.get<Profile>("/admin/profile");
    return res.data;
  },

  updateProfile: async (formData: FormData) => {
    const res = await instanceAxios.post("/admin/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
}
}
