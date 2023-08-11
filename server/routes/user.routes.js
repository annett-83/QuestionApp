const express = require("express");
const { convertSubjectStringsToObjectId } = require("../utils/helpers");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const tokenService = require("../services/token.service");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
const { enrichUserData } = require("../utils/helpers");

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

router.get("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;

        if (userId === req.user._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
                new: true,
            });
            res.send(enrichUserData(updatedUser));
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.post("/updateUserData/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;

        console.log(userId, req.body);
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
        }
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 12);
        }
        if (req.body.subjects) {
            req.body.subjects = await convertSubjectStringsToObjectId(
                req.body.subjects
            );
        }
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
        });
        res.send(enrichUserData(updatedUser));
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;
