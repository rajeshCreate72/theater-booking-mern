import { axiosInstance } from "./index";

export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/api/movies/get-all-movies");
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const GetAllShowsOfTheater = async (values) => {
    try {
        const response = await axiosInstance.get("/api/shows/get-all-theaters-by-movie", values);
        return response.data;
    } catch (error) {
        return error.response;
    }
};
