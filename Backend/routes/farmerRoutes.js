const express = require("express");
const router = express.Router();
const { registerFarmer, getFarmer, getAllFarmers, updateFarmerRating, addContractToFarmer, applyForCropDemand } = require("../controllers/farmerController");

router.post("/register", registerFarmer);
router.get("/:farmerId", getFarmer);
router.get("/", getAllFarmers);
router.put("/:farmerId/rating", updateFarmerRating);
router.post("/:farmerId/contract", addContractToFarmer);
router.post("/:farmerId/apply-crop-demand", applyForCropDemand);

module.exports = router