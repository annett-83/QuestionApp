const express = require("express");
const User = require("../models/User");
const Question = require("../models/Question");
const { query } = require("express-validator");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  // populate метод mongoos из id объектов subjects открывает полные данные subjects
  try {
    const userList = await User.find().populate([
      {
        path: "subjects",
      },
    ]);
    const teacherList = userList.filter((t) => t.isTeacher);
    const modifiedTeacherList = [];
    const queryTeacherAnsweredQuestionsList = [];
    teacherList.map((teacher) => {
      const modifiedTeacher = {
        _id: teacher._id,
        name: teacher.name,
        image: teacher.image,
        subjects: teacher.subjects,
        sex: teacher.sex,
      };
      queryTeacherAnsweredQuestionsList.push({ "answer.user": teacher._id });
      modifiedTeacherList.push(modifiedTeacher);
    });

    const QueryPromises = queryTeacherAnsweredQuestionsList.map(async (q) => {
      return await Question.find(q).populate([
        {
          path: "answer",
          populate: {
            path: "user",
          },
        },
      ]);
    });
    // находим количество отвеченых вопросов учителями
    const resultList = await Promise.all(QueryPromises);
    for (i = 0; i < modifiedTeacherList.length; i++) {
      modifiedTeacherList[i].numberOfQuestions = resultList[i].length;
    }
    res.status(200).send(modifiedTeacherList);
  } catch (error) {
    console.log("treacher error: ", error);
    res.status(500).json({
      message: "на сервере произошла ошибка.Попробуйте позже",
    });
  }
});

module.exports = router;
