import type { Product, ProductInput } from "../types/product.type";
import instanceAxios from "../utils/axios";

export interface ProductFilterParams {
  page?: number;
  per_page?: number;
  keyword?: string;
  danh_muc_id?: number;
  gia_min?: number;
  gia_max?: number;
  sort_by?: "ten" | "variants_min_gia_khuyen_mai" | "created_at";
  sort_order?: "asc" | "desc";
}

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const res = await instanceAxios.get("/products");
    return res.data?.data || [];
  },
  getPaginated: async (
    params: Record<string, any> = {}
  ): Promise<{
    data: Product[];
    meta: {
      current_page: number;
      last_page: number;
      total: number;
      per_page: number;
    };
  }> => {
    const res = await instanceAxios.get("/products", { params });
    return res.data;
  },
  filter: async (
    params: ProductFilterParams = {}
  ): Promise<{
    data: Product[];
    meta: {
      current_page: number;
      last_page: number;
      total: number;
      per_page: number;
    };
  }> => {
    const res = await instanceAxios.get("/products/filter", { params });
    return res.data;
  },
};

export const productServiceAdmin = {

  getAllAdmin: async (page: number, filters?: { keyword?: string; ten_danh_muc?: string; gia_tu?: number; gia_den?: number }): Promise<any> => {
    const params = new URLSearchParams({ page: String(page) });
  
    if (filters?.keyword) params.append("keyword", filters.keyword);
    if (filters?.ten_danh_muc) params.append("ten_danh_muc", filters.ten_danh_muc);
    if (filters?.gia_tu !== undefined) params.append("gia_tu", String(filters.gia_tu));
    if (filters?.gia_den !== undefined) params.append("gia_den", String(filters.gia_den));
  
    const res = await instanceAxios.get(`/admin/products?${params.toString()}`);
    return res.data; // { data, meta, status, message }
  },
 
  getPaginated: async (
    params: Record<string, any> = {}
  ): Promise<{
    data: Product[];
    meta: {
      current_page: number;
      last_page: number;
      total: number;
      per_page: number;
    };
  }> => {
    const res = await instanceAxios.get("/products", { params });
    return res.data;
  },
};
export const productDetailService = {
  getById: async (id: number): Promise<Product> => {
    const res = await instanceAxios.get(`/products/${id}`);
    return res.data?.data;
  },
};

// Thêm method getById vào productService chính
productService.getById = async (id: number): Promise<Product> => {
  const res = await instanceAxios.get(`/products/${id}`);
  return res.data?.data;
};

export const productadd = {
  create: async (data: FormData | ProductInput) => {
    const res = await instanceAxios.post("/admin/products", data);
    return res.data?.data;
  },
};

export const productdelete = {
  softDelete: (id: number) => instanceAxios.delete(`/admin/products/${id}`),
  forceDelete: (id: number) =>
    instanceAxios.delete(`/admin/products/force-delete/${id}`),
};
export const producttrash = {
  list: () => instanceAxios.get("/admin/products/trash"), // ✅ sửa đúng route
  restore: (id: number) => instanceAxios.patch(`/admin/products/restore/${id}`),
};

export const productupdate = {
  update: async (id: number, data: FormData) => {
    data.append("_method", "PUT"); // ✅ Thêm _method
    const res = await instanceAxios.post(`/admin/products/${id}`, data); // ✅ Gửi bằng POST
    return res.data?.data;
  },
};
export const productlist = {
  getAll: async (): Promise<Product[]> => {
    const res = await instanceAxios.get("/admin/products");
    return res.data?.data || [];
  },
};
//top 4 
export const productServiceclient = {
  getRelatedProducts: (productId: number) => {
    return instanceAxios.get(`/products/${productId}/related`);
  },
};