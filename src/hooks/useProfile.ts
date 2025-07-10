import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile, type Profile } from "../services/profile";
import { useNavigate } from "react-router-dom";


export const useProfile = () => {
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

// ✅ Hook cập nhật profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
const nav = useNavigate();
  return useMutation({
    mutationFn: (data: Partial<Profile>) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      nav("/thong-tin-khach-hang");
    },
  });
};
