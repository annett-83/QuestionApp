const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");
const Question = require("../models/Question");
// еще не реализованно
module.exports = router;
