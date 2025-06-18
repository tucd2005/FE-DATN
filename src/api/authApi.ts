import api from ".";
import type { ILoginPayload, IRegisterPayload } from "../types/auth";

export const loginApi = (data: ILoginPayload) => api.post(`/users`,data);
export const registerApi = (data: IRegisterPayload) => api.post(`/users`, data);
export const getProfile = (userId: string) => api.get(`/users/${userId}`)

