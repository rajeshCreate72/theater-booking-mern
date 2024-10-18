const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

dotenv.config();

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/users", userRoutes);

app.listen(8080, () => {
  console.log("Server is running at 8080");
});
