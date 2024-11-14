const router = require("express").Router();
const Show = require("../models/showModel");

//api for adding show
router.post("/add-show", async (req, res) => {
    try {
        const anotherShow = new Show(req.body);
        await anotherShow.save();
        res.send({
            success: true,
            message: "New show has been added",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.post("/get-show-by-id", async (req, res) => {
    try {
        const show = await Show.findById(req.body.showId).populate("movie").populate("theaters");

        res.send({
            success: true,
            message: "Show has been fetched",
            data: show,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// Getting movie by theater
router.post("/get-all-shows-by-theater", async (req, res) => {
    try {
        const anotherShow = await Show.find({ theaters: req.body.theaterId }).populate("movie");
        res.send({
            success: true,
            message: `${anotherShow.movie} show been fetched`,
            data: anotherShow,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

//update the show
router.put("/update-show", async (req, res) => {
    try {
        await Show.findByIdAndUpdate(req.body.showId, req.body);

        res.send({
            success: true,
            message: "The show has been updated",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

//Getting all theaters by movie
router.post("/get-all-theaters-by-movie", async (req, res) => {
    try {
        const { movie, date } = req.body;
        const shows = await Show.find({ movie, date }).populate("theaters");

        const uniqueTheaters = [];

        shows.forEach((show) => {
            // Check if the theater is in unique theater array
            let isTheater = uniqueTheaters.find((theater) => theater._id == show.theaters._id);
            if (!isTheater) {
                // If not
                // Then add the theater that matches the
                let showOfThatTheater = shows.filter(
                    (showObj) => show.theaters._id == showObj.theaters._id
                );
                uniqueTheaters.push({ ...show.theaters._doc, shows: showOfThatTheater });
            }
        });

        res.send({
            success: true,
            message: "Shows been fetched according to movie",
            data: uniqueTheaters,
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
