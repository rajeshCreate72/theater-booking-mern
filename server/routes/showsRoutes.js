const router = require("express").Router();
const Show = require("../models/showModel");

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

module.exports = router;
