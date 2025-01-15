import axios from 'axios';
const BASE_URL = "http://localhost:3000/";


export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": '*',
        // authorization: `Bearer ${localStorage.getItem("token")}`,
    }
})

axiosInstance.interceptors.request.use(function (config) {
    let token = localStorage.getItem("token");
    console.log('token from localstorage',token);
    config.headers["authorization"] = `Bearer ${token}`;
    return config;
  });

// export default axiosInstance;