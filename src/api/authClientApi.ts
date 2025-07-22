import type { ILoginPayload, IRegisterPayload } from "../types/auth";
import instanceAxios from "../utils/axios";

export const loginApi = (data: ILoginPayload) => instanceAxios.post(`/auth/login`, data);
export const registerApi = (data: IRegisterPayload) => instanceAxios.post(`/auth/register`, data);


// * gửi mã opt cho gmail 

export const sendOtpApi = (data: { email: string }) =>
  instanceAxios.post("/auth/send-otp", data);
  
  export const verifyOtpApi = (data: { email: string; otp: string }) =>
    instanceAxios.post("/auth/verify-otp", data);
  

// 
export const getProfile = (userId: string) => instanceAxios.get(`/users/${userId}`)

