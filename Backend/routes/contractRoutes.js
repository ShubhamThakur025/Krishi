const express = require("express");
const router = express.Router();
const { createContract, getContract } = require("../controllers/contractController");

router.post("/create", createContract );
router.post("/get", getContract );

module.exports = router