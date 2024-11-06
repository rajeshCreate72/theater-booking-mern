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

// Getting movie by theater
router.post("/get-all-shows-by-theater", async (req, res) => {
    try {
        const anotherShow = new Show.find({ theater: req.body.theaterId }).populate("movie");
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

        const show = await Show.findById(req.body.showId);

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

module.exports = router;
