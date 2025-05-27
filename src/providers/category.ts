import instanceAxios from "../utils/axios";

export type Props = {
  resource: string;
  id?: number | string;
  values?: any;
};

export const getList = async ({ resource }: Props) => {
  const { data } = await instanceAxios.get(resource);
  return data;
};

export const getOne = async ({ resource, id }: Props) => {
  if (!id) return;
  const { data } = await instanceAxios.get(`${resource}/${id}`);
  return data;
};

export const create = async ({ resource, values }: Props) => {
  const { data } = await instanceAxios.post(resource, values);
  return data;
};

export const update = async ({ resource, id, values }: Props) => {
  if (!id) return;
  const { data } = await instanceAxios.put(`${resource}/${id}`, values);
  return data;
};
