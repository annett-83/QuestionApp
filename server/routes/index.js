const express = require("express");
const router = express.Router({ mergeParams: true });
// /api/auth ...
router.use("/auth", require("./auth.routes"));
router.use("/question", require("./question.routes"));
router.use("/subject", require("./subject.routes"));
router.use("/answer", require("./answer.routes"));
router.use("/user", require("./user.routes"));
router.use("/teacher", require("./teacher.routes"));
router.use("/shop", require("./shop.routes")); // в стадии разработки

module.exports = router;
