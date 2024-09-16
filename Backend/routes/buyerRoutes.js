const express = require("express");
const router = express.Router();
const { registerBuyer, getBuyer } = require("../controllers/buyerController");

router.post("/register", registerBuyer);
router.get("/buyers", getBuyer);

module.exports = router