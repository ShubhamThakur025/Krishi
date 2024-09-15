const express = require("express");
const router = express.Router();
const { registerBuyer, getBuyer } = require("./controllers/buyerControllers");

router.post("/register", registerBuyer);
router.get("/buyers", getBuyer);
