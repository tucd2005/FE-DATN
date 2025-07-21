// src/services/variantService.ts

import instanceAxios from "../utils/axios";

export const variantService = {
  getById(id: number) {
    return instanceAxios.get(`/admin/variants/${id}`).then((res) => res.data.data);
  },

  getByProductId(productId: number) {
    return instanceAxios.get(`/admin/variants/list/${productId}`).then((res) => res.data.data);
  },

  getDeletedByProductId(productId: number) {
    return instanceAxios.get(`/admin/variants/deleted/${productId}`).then((res) => res.data.data);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(productId: number, data: any) {
    return instanceAxios.post(`/admin/variants/${productId}`, data).then((res) => res.data.data);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(id: number, data: any) {
    return instanceAxios.post(`/admin/variants/update/${id}`, data).then((res) => res.data.data);
  },

  delete(id: number) {
    return instanceAxios.delete(`/admin/variants/${id}`);
  },

  deleteByProductId(productId: number) {
    return instanceAxios.delete(`/admin/variants/product/${productId}`);
  },

  restore(id: number) {
    return instanceAxios.patch(`/admin/variants/restore/${id}`);
  },

  restoreByProductId(productId: number) {
    return instanceAxios.patch(`/admin/variants/restore/product/${productId}`);
  },

  forceDelete(id: number) {
    return instanceAxios.delete(`/admin/variants/force-delete/${id}`);
  },

  forceDeleteByProductId(productId: number) {
    return instanceAxios.delete(`/admin/variants/force-delete/product/${productId}`);
  },
};
