const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");
const Question = require("../models/Question");
const _ = require("lodash");
router.post("/new", auth, async (req, res) => {
    try {
        const callUser = await User.findById(req.user._id);
        if (!callUser.isTeacher) {
            const newQuestion = await Question.create({
                ...req.body,
                user: callUser._id,
            });
            res.status(201).send({ questionId: newQuestion._id });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const callUser = await User.findById(req.user._id);

        // Prepare Population Array
        const userSelect = "_id name";
        const populationArray = [
            {
                path: "answer",
                populate: {
                    path: "user",
                    select: userSelect,
                },
            },
            {
                path: "subject",
                select: "_id name color",
            },
            {
                path: "user",
                select: userSelect,
            },
        ];
        const list = await Question.find()
            .sort("-updatedAt")
            .populate(populationArray);

        const nlist = list.map(function (lquestion) {
            const question = { ...lquestion._doc };

            question.isOpen = !("answer" in question);

            question.canAnswer =
                question.isOpen &&
                callUser.isTeacher &&
                callUser.teachesSubject(question.subject._id.toString());

            if (!question.isOpen) {
                question.canViewAnswer =
                    question.user === callUser._id ||
                    question.answer.user.toString() === callUser._id.toString();
            }

            if (!question.canViewAnswer && !question.isOpen) {
                delete question.answer.content;
            }
            lquestion._doc = {
                ...question,
            };
            return lquestion;
        });

        res.send(nlist);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});
module.exports = router;
