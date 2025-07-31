import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "../services/contactService";
import { toast } from "react-toastify";

export const useContactList = (params?: any) => {
  return useQuery({
    queryKey: ["contacts", params],
    queryFn: () => contactService.getAll(params).then(res => res.data),
    staleTime: 1000 * 60,
  });
};

export const useContactSearch = (params: { q?: string; status?: string; page?: number }) => {
  return useQuery({
    queryKey: ["contacts-search", params],
    queryFn: () => contactService.search(params).then(res => res.data),
    staleTime: 1000 * 60,
  });
};

export const useContactDetail = (id: number | undefined) => {
  return useQuery({
    queryKey: ["contact", id],
    queryFn: () => id ? contactService.getById(id).then(res => res.data) : null,
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};

export const useReplyContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reply_content }: { id: number; reply_content: string }) =>
      contactService.reply(id, reply_content),
    onSuccess: () => {
      toast.success("Đã gửi phản hồi");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contacts-search"] });
    },
    onError: () => {
      toast.error("Gửi phản hồi thất bại");
    },
  });
};

export const useSendContact = () => {
  return useMutation({
    mutationFn: contactService.sendContact,
  });
};

export const useContactTypes = () => {
  return useQuery({
    queryKey: ["contact-types"],
    queryFn: () => contactService.getContactTypes().then(res => res.data.types),
    staleTime: 1000 * 60 * 60,
  });
}; 

export const useUpdateContactStatus = () => {
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      contactService.updateStatus(id, status),
  });
};
