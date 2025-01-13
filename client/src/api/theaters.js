import { axiosInstance } from "./index";

export const GetAllTheaters = async () => {
    try {
        const response = await axiosInstance.get("api/theaters/get-all-theaters");
        return response.data;
    } catch (error) {
        return error.message;
    }
};

export const AddTheater = async (values) => {
    try {
        const response = await axiosInstance.post("api/theaters/add-theater", values);
        return response;
    } catch (error) {
        return error.message;
    }
};
