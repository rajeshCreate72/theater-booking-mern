const router = require("express").Router();
const Theater = require("../models/theaterModel");

router.post("/add-theater", async (req, res) => {
    try {
        const anotherTheater = new Theater(req.body);

        await anotherTheater.save();

        res.send({
            success: true,
            message: `${req.body.name} has been added!`,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.get("/get-all-theaters", async (req, res) => {
    try {
        const allTheaters = await Theater.find().populate("owner");

        res.send({
            success: true,
            message: "All theaters",
            data: allTheaters,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.delete("/delete-theater", async (req, res) => {
    try {
        const theTheater = await Movie.findByIdAndDelete(req.body.theaterId);

        res.send({
            success: true,
            message: `${theTheater.name} has been deleted`,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.put("/update-theater", async (req, res) => {
    try {
        const theTheater = await Movie.findByIdAndUpdate(req.body.theaterId, req.body);
        const updatedTheater = await Movie.findByID(req.body.theaterId);

        res.send({
            success: true,
            message: `${theTheater.title} has been updated`,
            data: updatedTheater,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.get("/get-all-theaters", async (req, res) => {
    try {
        const allTheaters = await Theater.find({ owner: req.body.owner });

        res.send({
            success: true,
            message: "All theaters",
            data: allTheaters,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
