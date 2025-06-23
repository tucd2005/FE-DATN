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
    