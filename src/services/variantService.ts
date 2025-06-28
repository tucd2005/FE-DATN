import instanceAxios from "../utils/axios";
import type {
  Variant,
  VariantInput,
  VariantUpdateInput,
} from "../types/variant.type";

export const variantService = {
  // Lấy chi tiết biến thể
  getById: async (id: number): Promise<Variant> => {
    const res = await instanceAxios.get(`/admin/variants/${id}`);
    return res.data.data;
  },

  // Lấy danh sách biến thể theo sản phẩm
  getByProductId: async (productId: number): Promise<Variant[]> => {
    const res = await instanceAxios.get(`/admin/variants/list/${productId}`);
    return res.data.data;
  },

  // Lấy danh sách biến thể đã xóa theo sản phẩm
  getDeletedByProductId: async (productId: number): Promise<Variant[]> => {
    const res = await instanceAxios.get(`/admin/variants/deleted/${productId}`);
    return res.data.data;
  },

  // Tạo biến thể mới
  create: async (productId: number, data: VariantInput): Promise<Variant> => {
    const formData = new FormData();

    // Thêm dữ liệu cơ bản
    formData.append("so_luong", data.so_luong.toString());
    formData.append("gia", data.gia);
    if (data.gia_khuyen_mai) {
      formData.append("gia_khuyen_mai", data.gia_khuyen_mai);
    }

    // Thêm ảnh
    if (data.hinh_anh) {
      data.hinh_anh.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    // Thêm attributes
    data.attributes.forEach((attr, index) => {
      formData.append(
        `attributes[${index}][thuoc_tinh_id]`,
        attr.thuoc_tinh_id.toString()
      );
      formData.append(`attributes[${index}][gia_tri]`, attr.gia_tri);
    });

    const res = await instanceAxios.post(
      `/admin/variants/${productId}`,
      formData
    );
    return res.data.data;
  },

  // Cập nhật biến thể
  update: async (id: number, data: VariantUpdateInput): Promise<Variant> => {
    const formData = new FormData();

    // Thêm dữ liệu cơ bản
    if (data.so_luong !== undefined) {
      formData.append("so_luong", data.so_luong.toString());
    }
    if (data.gia) {
      formData.append("gia", data.gia);
    }
    if (data.gia_khuyen_mai) {
      formData.append("gia_khuyen_mai", data.gia_khuyen_mai);
    }

    // Thêm ảnh
    if (data.hinh_anh) {
      data.hinh_anh.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    // Thêm attributes
    if (data.attributes) {
      data.attributes.forEach((attr, index) => {
        formData.append(
          `attributes[${index}][thuoc_tinh_id]`,
          attr.thuoc_tinh_id.toString()
        );
        formData.append(`attributes[${index}][gia_tri]`, attr.gia_tri);
      });
    }

    const res = await instanceAxios.post(
      `/admin/variants/update/${id}`,
      formData
    );
    return res.data.data;
  },

  // Xóa mềm biến thể
  delete: async (id: number): Promise<void> => {
    await instanceAxios.delete(`/admin/variants/${id}`);
  },

  // Xóa mềm tất cả biến thể của sản phẩm
  deleteByProductId: async (productId: number): Promise<void> => {
    await instanceAxios.delete(`/admin/variants/product/${productId}`);
  },

  // Khôi phục biến thể
  restore: async (id: number): Promise<Variant> => {
    const res = await instanceAxios.patch(`/admin/variants/restore/${id}`);
    return res.data.data;
  },

  // Khôi phục tất cả biến thể của sản phẩm
  restoreByProductId: async (productId: number): Promise<void> => {
    await instanceAxios.patch(`/admin/variants/restore/product/${productId}`);
  },

  // Xóa vĩnh viễn biến thể
  forceDelete: async (id: number): Promise<void> => {
    await instanceAxios.delete(`/admin/variants/force-delete/${id}`);
  },

  // Xóa vĩnh viễn tất cả biến thể của sản phẩm
  forceDeleteByProductId: async (productId: number): Promise<void> => {
    await instanceAxios.delete(
      `/admin/variants/force-delete/product/${productId}`
    );
  },
};
