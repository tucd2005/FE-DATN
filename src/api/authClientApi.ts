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



export const sendForgotOtpApi = (data: { email: string }) =>
  instanceAxios.post("/auth/forgot-password", data);



export const resetPasswordApi = (data: { email: string; new_password: string; new_password_confirmation: string }) =>
  instanceAxios.post("/auth/reset-password", data)

export const verifyForgotOtpApi = (data: { email: string; otp: string }) =>
  instanceAxios.post("/auth/verify-otp-password", data);


