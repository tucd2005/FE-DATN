import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { getList, getOne, create, update, type Props } from "../services/category";

const RESOURCE = "admin/category";

// Lấy danh sách
export const useList = () => {
  return useQuery({
    queryKey: [RESOURCE],
    queryFn: () => getList({ resource: RESOURCE }),
  });
};

// Lấy 1 danh mục theo ID
export const useOne = ({ id }: { id: string | number }) => {
  return useQuery({
    queryKey: [RESOURCE, id],
    queryFn: () => getOne({ resource: RESOURCE, id }),
    enabled: !!id,
  });
};

// Tạo mới danh mục
export const useCreate = () => {
  return useMutation({
    mutationFn: (values: any) => create({ resource: RESOURCE, values }),
    onSuccess: () => {
      message.success("Thêm danh mục thành công!");
    },
    onError: () => {
      message.error("Thêm danh mục thất bại!");
    },
  });
};

// Cập nhật danh mục
export const useUpdate = () => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: any }) => update({ resource: RESOURCE, id, values }),
    onSuccess: () => {
      message.success("Cập nhật thành công");
      nav("/admin/category"); // <- đảm bảo đây là đúng đường dẫn danh sách
    },
    onError: () => {
      message.error("Cập nhật thất bại");
    },
  });
};
