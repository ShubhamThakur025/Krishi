const express = require("express");
const router = express.Router();
const { registerBuyer, getBuyer, getAllBuyers, updateBuyerRating, addContractToBuyer, postCropDemand } = require("../controllers/buyerController");

router.post("/register", registerBuyer);
router.get("/:buyerId", getBuyer);
router.get("/", getAllBuyers);
router.put("/:buyerId/rating", updateBuyerRating);
router.post("/:buyerId/contract", addContractToBuyer);
router.post("/:buyerId/crop-demand", postCropDemand);

module.exports = router