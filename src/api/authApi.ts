import api from ".";
import type { ILoginPayload, IRegisterPayload } from "../types/auth";

export const loginApi = (data: ILoginPayload) => api.post(`/auth/login`, data);
export const registerApi = (data: IRegisterPayload) => api.post(`/auth/register`, data);


// * gửi mã opt cho gmail 

export const sendOtpApi = (data: { email: string }) =>
    api.post("/auth/send-otp", data);
  
  export const verifyOtpApi = (data: { email: string; otp: string }) =>
    api.post("/auth/verify-otp", data);
  

// 
export const getProfile = (userId: string) => api.get(`/users/${userId}`)

