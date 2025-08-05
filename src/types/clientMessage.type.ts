export interface ClientMessage {
  id: number;
  nguoi_gui: {
    id: number;
    name: string;
  };
  nguoi_nhan: {
    id: number;
    name: string;
  };
  noi_dung: string;
  tep_dinh_kem?: string;
  created_at: string;
}
