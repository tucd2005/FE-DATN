import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";


const api = axios.create({
    baseURL: "https://chu-duc-tu-server.onrender.com/",
    headers: {
        "Content-Type": "application/json"
    },
});

api.interceptors.request.use(
    function (config: InternalAxiosRequestConfig)  {  // khi ở Axios v1.x trở lên thì yêu cầu dùng InternalAxiosRequestConfig 
        // console.log(config);
        const accessToken = localStorage.getItem("accessToken")
        if(accessToken && config.headers){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        // console.log(config);
        return config;
    },
    function (error) {
        return Promise.reject(error)
    }
)
export default api 