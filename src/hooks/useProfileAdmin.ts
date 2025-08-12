// src/hooks/useProfile.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { profileService, type UpdateProfilePayload } from "../services/profileAdmin";
import { useNavigate } from "react-router-dom";

export function useProfile() {
    const queryClient = useQueryClient();
  const nav= useNavigate();
    // Lấy thông tin profile
    const profileQuery = useQuery({
      queryKey: ["profile"],
      queryFn: profileService.getProfile,
    });
  
    // Cập nhật profile
    const updateProfileMutation = useMutation({
      mutationFn: (data: UpdateProfilePayload) => profileService.updateProfile(data),
      onSuccess: (res) => {
        message.success(res.message || "Cập nhật thành công");
        nav("/admin")
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      },
      onError: (err: any) => {
        message.error(err.response?.data?.message || "Cập nhật thất bại");
      },
    });
  
    return {
      profileQuery,
      updateProfileMutation,
    };
  }
