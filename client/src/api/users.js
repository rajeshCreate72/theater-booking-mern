import { resolvePath } from "react-router-dom";
import { axiosInstance } from "./index";

export const LoginUser = async (value) => {
    try {
        const response = await axiosInstance.post("/api/users/login", value);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const RegisterUser = async (value) => {
    try {
        const response = await axiosInstance.post("/api/users/register", value);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/users/get-current-user");
        return response;
    } catch (error) {
        throw new Error("Session Expired");
    }
};
