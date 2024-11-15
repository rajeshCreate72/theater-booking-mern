const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const moviesRoutes = require("./routes/movieRoutes");
const theaterRoutes = require("./routes/theaterRoutes");
const showsRoutes = require("./routes/showsRoutes");

const app = express();

app.use(express.json());

dotenv.config();

app.use("/", (req, res) => {
    res.send("<h1>Hello</h1>");
});

app.options("*", cors()); // Enable CORS preflight for all routes

app.use(
    cors({
        origin: ["https://theater-booking-mern-client.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((error) => {
        console.log(error);
    });

app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/shows", showsRoutes);

app.listen(8080, () => {
    console.log("Server is running at 8080");
});
