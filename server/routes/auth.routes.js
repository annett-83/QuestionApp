const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const {
  generateUserData,
  convertSubjectStringsToObjectId,
} = require("../utils/helpers");
const tokenService = require("../services/token.service");
const router = express.Router({ mergeParams: true });

router.post("/signUp", [
  check("email", "false mail").isEmail(),
  check("password", "min 8 symbols").isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            errors: errors.array(),
          },
        });
      }
  
      req.body.email=req.body.email.toLowerCase();
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXIST",
            code: 400,
          },
        });
      }
      if (req.body.subjects) {
        req.body.subjects = await convertSubjectStringsToObjectId(req.body.subjects);

      }


      
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        ...generateUserData(),
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);
 
      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже...",
        // message: { error },
      });
    }
  },
]);

router.post("/signInWithPassword", [
  async (req, res) => {
  
    try {
  
      const errors = validationResult(req.body);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }

      req.body.email= req.body.email.toLowerCase();
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email});
   
      if (!existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }
      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordEqual) {
        return res.status(400).json({
          error: {
            message: "IWALID_PASSWORD",
            code: 400,
          },
        });
      }
      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);
      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже...",
        code: 500
      });
    }
  },
]);

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post("/token", async (req, res) => {
  try {
    console.log("Auth token");
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findTocken(refreshToken);
    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: "unauthorized/token expired" });
    }
    const tokens = await tokenService.generate({ id: data._id });
    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (error) {
    if (error.response.status="")
    console.log(error);

    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже...",
      // message: { error },
    });
  }
});
module.exports = router;
