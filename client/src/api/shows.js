import { axiosInstance } from "./index";

export const GetAllShowsByMovie = async (values) => {
    try {
        const response = await axiosInstance.post("/api/shows/get-all-theaters-by-movie", values);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const GetShowById = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/shows/get-show-by-id", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
};
