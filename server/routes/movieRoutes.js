const express = require("express");
const router = express.Router();
const Movie = require("../models/moviesModel");

// Admin to add a movie
router.post("/add-movie", async (req, res) => {
    try {
        const anotherMovie = new Movie(req.body);

        await anotherMovie.save();

        res.send({
            success: true,
            message: `${req.body.title} has been added!`,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.get("/get-all-movies", async (req, res) => {
    try {
        const allMovies = await Movie.find();

        res.send({
            success: true,
            message: "All movies",
            data: allMovies,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.put("/update-movie", async (req, res) => {
    try {
        const theMovie = await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        const updatedMovie = await Movie.findByID(req.body.movieId);

        res.send({
            success: true,
            message: `${theMovie.title} has been updated`,
            data: updatedMovie,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.delete("/delete-movie", async (req, res) => {
    try {
        const theMovie = await Movie.findByIdAndDelete(req.body.movieId);

        res.send({
            success: true,
            message: `${theMovie.title} has been deleted`,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.get("/movie/:id", async (req, res) => {
    try {
        const theMovie = await Movie.findById(req.params.id);

        res.send({
            success: true,
            message: "All movies",
            data: theMovie,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
