import { axiosInstance } from "./index";

export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/api/movies/get-all-movies");
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const GetAllShowsByMovie = async (values) => {
    try {
        const response = await axiosInstance.post("/api/shows/get-all-theaters-by-movie", values);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const GetShowById = async (id) => {
    try {
        const response = await axiosInstance.post("/api/shows/get-show-by-id", id);
        return response.data;
    } catch (error) {
        return error.message;
    }
};
