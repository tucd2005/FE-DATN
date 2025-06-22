import instanceAxios from "../utils/axios";

export type Props = {
  resource: string;
  id?: number | string;
  values?: any;
};

export const getList = async ({ resource }: Props) => {
  const response = await instanceAxios.get(`/${resource}`);
  const raw = response.data;

  console.warn("⚠️ Dữ liệu từ getList:", raw);

  if (Array.isArray(raw)) return raw;
  if (raw?.data && Array.isArray(raw.data.data)) return raw.data.data;

  return []; // fallback để không lỗi
};

export const getOne = async ({ resource, id }: Props) => {
  if (!id) return;
  const { data } = await instanceAxios.get(`/${resource}/${id}`);
  return data;
};

export const create = async ({ resource, values }: Props) => {
  const { data } = await instanceAxios.post(`/${resource}`, values);
  return data;
};

export const update = async ({ resource, id, values }: Props) => {
  if (!id) return;
  const { data } = await instanceAxios.put(`/${resource}/${id}`, values);
  return data;
};
