import api from "."


interface IAdminLoginPayload {
    email: string,
    password: string
}
export const adminLoginApi = (data: IAdminLoginPayload) => {
    api.post("/admin/login",data)
}
