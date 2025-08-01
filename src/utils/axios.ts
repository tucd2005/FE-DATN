import axios from "axios";

const instanceAxios = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Add a request interceptor
instanceAxios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    console.log("Token:", token);
    if (token) {
      if (config.headers) {
        config.headers["Authorization"] = `Bearer ${token }`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      instanceAxios.defaults.headers.common["Authorization"] =
        "Bearer " + newToken  ;
      return instanceAxios(originalRequest);
    }
    // message.error(error.response?.data?.message);
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  const user = localStorage.getItem("user");

  if (user) {
    const { _id } = JSON.parse(user);
    try {
      const response = await instanceAxios.post("/token/refresh", { _id });
      const newToken = response.data.accessToken;
      localStorage.setItem("token", newToken);
      return newToken;
    } catch (error) {
      console.error("Lỗi khi làm mới token:", error);
    }
  }
};

export default instanceAxios;
