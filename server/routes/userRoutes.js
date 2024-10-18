const express = require("express");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            res.send({
                success: false,
                message: "User already exist",
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        req.body.password = hashPassword;

        const aUser = await User(req.body);

        await aUser.save();

        res.send({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.send({
                success: false,
                message: "User doesnot exist",
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            res.send({
                success: false,
                message: "Invalid Password",
            });
            return;
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: "1d" });

        res.send({
            success: true,
            message: "Logged in",
            token: token,
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/get-current-user", AuthMiddleware, async (req, res) => {
    // Giving the authorization to the user
    const user = await User.findById(req.body.userId).select("-password -isAdmin -_id");

    res.send({
        success: true,
        message: "You are authorised",
        data: user,
    });
});

module.exports = router;
