export interface User {
  id: number;
  name: string;
  [key: string]: any;
}

export interface Message {
  id: number;
  noi_dung: string;
  tep_dinh_kem?: string;
  nguoi_gui_id: number;
  nguoi_gui_name: string;
  nguoi_nhan_id: number;
  nguoi_nhan_name: string;
  created_at: string;
}
