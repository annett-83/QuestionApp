const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
router.post("/new", auth, async (req, res) => {
    try {
        const callUser = await User.findById(req.user._id);
        const questionId = req.body.question;
        const answeredQuestion = await Question.findById(questionId);
        let answerErrorMessage = "";
        if (!answeredQuestion) { // если еще нет отвеченых вопросов
            answerErrorMessage = answerErrorMessage + "Нет отвеченых вопрос";
        } else if (answeredQuestion.answer) { // если есть отвеченные вопросы
            answerErrorMessage = answerErrorMessage = "Вопрос уже отвечен";
        } else if (!callUser.teachesSubject(answeredQuestion.subject)) { // если учитель не является учителем по предмету заданного вопроса
            answerErrorMessage = answerErrorMessage = "Учитель не подходящего предмета по заданному вопросу";
        } else {

            const newAnswer = new Answer({
                ...req.body,
                user: callUser._id
            });
            await Question.findByIdAndUpdate(questionId, { answer: newAnswer });
            res.status(201).send({});
        };

        if (answerErrorMessage !== "") {
            { res.status(401).json({ message: answerErrorMessage }); };
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});
module.exports = router;