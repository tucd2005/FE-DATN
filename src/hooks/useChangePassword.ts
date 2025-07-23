import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { accountService } from "../services/accountService";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: accountService.changePassword,
    onSuccess: (res) => {
      message.success(res.data.message || "Đổi mật khẩu thành công");
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        message.error("Mật khẩu hiện tại không đúng");
      } else if (error.response?.data?.errors) {
        const err = Object.values(error.response.data.errors).flat();
        message.error(err[0] as string);
      } else {
        message.error("Đổi mật khẩu thất bại");
      }
    },
  });
};
