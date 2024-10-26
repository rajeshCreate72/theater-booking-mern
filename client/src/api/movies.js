import { axiosInstance } from "./index";

export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/api/movies/get-all-movies");
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post("/api/movies/add-movie", values);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};
