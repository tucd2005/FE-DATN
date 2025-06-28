import instanceAxios from "../utils/axios";

export const getListCategory = async ({
  resource,
  params,
}: {
  resource: string;
  params?: {
    search?: string;
    page?: number;
  };
}) => {
  const res = await instanceAxios.get(`/${resource}`, { params });

  return res.data; //* do res.data = {message, status, data}
};

export const getOneCategory = async ({
  resource,
  id,
}: {
  resource: string;
  id: string | number;
}) => {
  const res = await instanceAxios.get(`/${resource}/${id}`);
  return res.data.data;
};

export const createCategory = async ({
  resource,
  values,
}: {
  resource: string;
  values: FormData;
}) => {
  const res = await instanceAxios.post(`/${resource}`, values);
  return res.data.data;
};

export const updateCategory = async ({
  resource,
  id,
  values,
}: {
  resource: string;
  id: string | number;
  values: FormData;
}) => {
  values.append("_method", "PUT");

  const res = await instanceAxios.post(`/${resource}/${id}`, values);
  return res.data.data;
};

export const deleteCategory = async ({
  resource,
  id,
}: {
  resource: string;
  id: string | number;
}) => {
  const res = await instanceAxios.delete(`/${resource}/${id}`);
  return res.data.message || "Xoá thành công";
};
export const restoreCategory = async ({
  resource,
  id,
}: {
  resource: string;
  id: string | number;
}) => {
  const res = await instanceAxios.post(`/${resource}/${id}/restore`);
  return res.data.message || "Khôi phục thành công";
};
export const forceDeleteCategory = async ({
  resource,
  id,
}: {
  resource: string;
  id: string | number;
}) => {
  const res = await instanceAxios.delete(`/${resource}/${id}/force`);
  return res.data.message || "Xoá vĩnh viễn thành công";
};

// Service cho danh mục đã xóa
export const categoryTrash = {
  list: () => instanceAxios.get("/admin/category/trash/list"),
  restore: (id: number) => instanceAxios.post(`/admin/category/restore/${id}`),
  forceDelete: (id: number) =>
    instanceAxios.delete(`/admin/category/force-delete/${id}`),
};
