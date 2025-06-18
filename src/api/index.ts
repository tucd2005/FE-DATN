import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";


const api = axios.create({
    baseURL: "http://localhost:3000",
    // ! đoạn này khôgn lên cho vào vì khi upload ảnh thì không nhận được 
    // headers: {
    //     "Content-Type": "application/json"
    // },
});

api.interceptors.request.use(
    function (config: InternalAxiosRequestConfig)  {  // * khi ở Axios v1.x trở lên thì yêu cầu dùng InternalAxiosRequestConfig 
        const accessToken = localStorage.getItem("accessToken")
        if(accessToken && config.headers){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    function (error) {
        return Promise.reject(error)
    }
)
export default api 