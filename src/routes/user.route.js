const express = require("express");
const validate = require("../middlewares/validate");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/profile", auth(), userController.getProfileInfo);
module.exports = router;
