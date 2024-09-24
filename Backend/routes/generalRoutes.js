const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/generalController");

router.post("/login",  loginUser);

module.exports = router