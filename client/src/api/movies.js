import { axiosInstance } from "./index";

export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get("api/movies/get-all-movies");
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post("api/movies/add-movie", values);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const GetMovieByID = async (id) => {
    try {
        const response = await axiosInstance.get(`api/movies/movie/${id}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
};
