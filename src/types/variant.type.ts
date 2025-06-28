export interface AttributeValue {
  id: number;
  thuoc_tinh_id: number;
  gia_tri: string;
  attribute?: {
    id: number;
    ten: string;
    mo_ta?: string;
  };
}

export interface Variant {
  id: number;
  san_pham_id: number;
  so_luong: number;
  gia: string;
  gia_khuyen_mai?: string;
  hinh_anh: string[] | null;
  attributeValues: AttributeValue[];
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface VariantInput {
  so_luong: number;
  gia: string;
  gia_khuyen_mai?: string;
  hinh_anh?: File[];
  attributes: {
    thuoc_tinh_id: number;
    gia_tri: string;
  }[];
}

export interface VariantUpdateInput {
  so_luong?: number;
  gia?: string;
  gia_khuyen_mai?: string;
  hinh_anh?: File[];
  attributes?: {
    thuoc_tinh_id: number;
    gia_tri: string;
  }[];
}
