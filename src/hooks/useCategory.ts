 // hoặc "@/providers/category"

 import { useMutation, useQuery } from "@tanstack/react-query";
 import { message } from "antd";
 
 import { useNavigate } from "react-router-dom";
import { getList, type Props, getOne, create, update } from "../providers/category";
 
 // Lấy danh sách
 export const useList = ({ resource = "categories" }) => {
   return useQuery({
     queryKey: [resource],
     queryFn: () => getList({ resource }),
   });
 };
 
 // Lấy 1 danh mục theo ID
 export const useOne = ({ resource = "categories", id }: Props) => {
   return useQuery({
     queryKey: [resource, id],
     queryFn: () => getOne({ resource, id }),
     enabled: !!id,
   });
 };
 
 // Tạo mới danh mục
 export const useCreate = ({ resource = "categories" }) => {
   return useMutation({
     mutationFn: (values: any) => create({ resource, values }),
     onSuccess: () => {
       message.success("Thêm danh mục thành công!");
     },
     onError: () => {
       message.error("Thêm danh mục thất bại!");
     },
   });
 };
 
 // Cập nhật danh mục
 export const useUpdate = ({ resource = "categories" }) => {
   const nav = useNavigate();
   return useMutation({
     mutationFn: ({ id, values }: { id: string; values: any }) => update({ resource, id, values }),
     onSuccess: () => {
       message.success("Cập nhật thành công");
       nav("/admin/categorys"); // sửa lại đúng đường dẫn plural "categories"
     },
   });
 };
 