import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://theater-booking-mern.vercel.app",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
});
