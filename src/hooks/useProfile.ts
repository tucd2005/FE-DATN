import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile, type Profile } from "../services/profile";


export const useProfile = () => {
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

// ✅ Hook cập nhật profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Profile>) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
