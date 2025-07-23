import instanceAxios from "../utils/axios";

export const accountService = {
  changePassword: (data: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  }) => instanceAxios.put("/client/change-password", data),
};
