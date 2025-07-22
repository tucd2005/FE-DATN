import instanceAxios from "../utils/axios";

interface IAdminLoginPayload {
  email: string;
  password: string;
}
export const adminLoginApi = (data: IAdminLoginPayload) => {
  instanceAxios.post("/admin/login", data);
};

// {
//     "email": "longlhph31572@gmail.com",
//     "password": "123456789"
// }
