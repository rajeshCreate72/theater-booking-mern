import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://theater-booking-mern-server.vercel.app",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});
