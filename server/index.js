const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const moviesRoutes = require("./routes/movieRoutes");
const theaterRoutes = require("./routes/theaterRoutes");
const showsRoutes = require("./routes/showsRoutes");
const bookingRoutes = require("./routes/bookingRoute");

dotenv.config();

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: ["https://theater-booking-mern-client.vercel.app", "http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.options("*", cors()); // Pre-flight requests for all routes

app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
      <html>
        <title>Server</title>
        <h1>Hello theater webisite</h1>
      </html>
    `);
});

mongoose
    .connect(process.env.DB_URI, { serverSelectionTimeoutMS: 30000 })
    .then(() => console.log("Connected to database"))
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });

app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/shows", showsRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(8080, () => {
    console.log("Server is running at 8080");
});
