import { axiosInstance } from "./index";

export const makePayment = async (token, amount) => {
    try {
        const response = await axiosInstance.post("/api/bookings/make-payment", { token, amount });
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const bookShow = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/bookings/book-show", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const getAllBookings = async () => {
    try {
        const response = await axiosInstance.get("/api/bookings/get-all-bookings");
        return response.data;
    } catch (error) {
        return error.response;
    }
};