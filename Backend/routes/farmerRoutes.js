const express = require('express')
const router = express.Router()
const { registerFarmer, getFarmer } = require("./controllers/farmerControllers")

router.post('/register', registerFarmer);
router.get('/farmer', getFarmer);
