export interface Product {
  id: number
  ten: string
  gia: string
  gia_khuyen_mai: string
  so_luong: number
  mo_ta: string
  hinh_anh: string[] | string | null// BE trả về mảng
  danh_muc_id: number
  created_at: string
  updated_at: string
  variants: Variant[]
  danh_muc: {
    id: number
    ten: string
    created_at: string
    updated_at: string
  }
  ten_danh_muc: string
}
export interface Variant {
  id: number
  so_luong: number
  gia: string
  gia_khuyen_mai: string
  hinh_anh: string | null
  thuoc_tinh: AttributeValue[]
}
export interface AttributeValue {
  ten: string
  gia_tri: string
}
export interface VariantInput {
  so_luong: number
  gia: string
  gia_khuyen_mai: string
  hinh_anh: string[]
  thuoc_tinh: {
    ten: string
    gia_tri: string
  }[]
}

export interface ProductInput {
  ten: string
  gia: string
  gia_khuyen_mai: string
  so_luong: number
  mo_ta: string
  hinh_anh: string[]
  danh_muc_id: number
  variants?: VariantInput[]
}


export interface IFavoriteProduct {
  id: number;
  nguoi_dung_id: number;
  san_pham_id: number;
  created_at: string;
  updated_at: string;
  product: {
    id: number;
    ten: string;
    so_luong: number;
    so_luong_da_ban: number;
    mo_ta: string;
    hinh_anh: string;
    danh_muc_id: number;
    id_danh_muc_cu: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
}
