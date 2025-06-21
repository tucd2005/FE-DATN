import axios, {
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
  } from "axios"
  
  const api = axios.create({
    baseURL: "http://localhost:8000/api", //* Laravel backend
    // ! Không set Content-Type ở đây nếu upload file
  })
  
  api.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
      const token = localStorage.getItem("accessToken") // bạn cần đảm bảo token được lưu đúng tên này
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )
  
  export default api
  