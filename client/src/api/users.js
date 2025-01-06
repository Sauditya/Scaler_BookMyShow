// import { axiosInstance } from ".";
const { axiosInstance } = require(".");

export const LoginUser = async (value) => {
    try{
        const response = await axiosInstance.post("/api/users/login",value);
        return response.data;
    }catch(err){
        console.log("Error occuered at client side in login endpoint:", err);
    }
}

export const RegisterUser = async (value) => {
    try{
        const response = await axiosInstance.post("/api/users/register",value);
        return response.data;
    }catch(err){
        console.log("Error occuered at client side in register endpoint:", err);
    }
}

export const GetCurrentUser = async () => {
    try{
        console.log('axios instance', axiosInstance);
        const response = await axiosInstance.get("/api/users/get-current-user");
        return response.data;
    }catch(err){
        console.log("Error occuered at client side in get user endpoint:", err);
    }
}