const Buyer = require("../models/buyerSchema");
const Contract = require('../models/contractSchema');
const CropDemand = require('../models/cropDemandSchema')

const registerBuyer = async (req, res) => {
  try {
    const { name, mobile, photo, generalCrops, location, category } = req.body;
    if (!name || !mobile) {
      return res.status(400).json({
        message: "Name and mobile are required fields."
      });
    }
    const buyerId = "BID" + Date.now();
    const newBuyer = await Buyer.create({
      buyerId,
      name,
      mobile,
      photo: photo || null,
      generalCrops: generalCrops || null,
      location: location || null,
      category: category || null
    });
    return res.status(201).json({
      message: "Buyer account created successfully!",
      buyer: newBuyer
    });

  } catch (error) {
    console.error("Error creating buyer:", error);
    return res.status(500).json({
      message: "Failed to create buyer. Please try again later.",
      error: error.message
    });
  }
};

const getBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const buyer = await Buyer.findOne({ where: { buyerId } });
    if (!buyer) {
      return res.status(404).json({
        message: "Buyer not found",
      });
    }
    return res.status(200).json({
        buyerId: buyer.buyerId,
        name: buyer.name,
        mobile: buyer.mobile,
        photo: buyer.photo,
        generalCrops: buyer.generalCrops,
        location: buyer.location,
        category: buyer.category,
        ratings: buyer.ratings,
        filledBids: JSON.parse(buyer.filledBids),
        confirmedBids: JSON.parse(buyer.confirmedBids)
    });
  } catch (error) {
    console.error("Error fetching buyer details:", error);
    return res.status(500).json({
      message: "Failed to retrieve buyer details. Please try again later.",
      error: error.message,
    });
  }
};

const getAllBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.findAll();
    return res.status(200).json({
      message: "Buyers retrieved successfully!",
      buyers,
    });
  } catch (error) {
    console.error("Error fetching buyers:", error);
    return res.status(500).json({
      message: "Failed to retrieve buyers. Please try again later.",
      error: error.message,
    });
  }
};

const updateBuyerRating = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const { professionalism, timelyPayments, adherenceToContract } = req.body;
    const buyer = await Buyer.findOne({ where: { buyerId } });
    if (!buyer) {
      return res.status(404).json({
        message: "buyer not found",
      });
    }
    if (
      professionalism < 0 || professionalism > 5 ||
      timelyPayments < 0 || timelyPayments > 5 ||
      adherenceToContract < 0 || adherenceToContract > 5
    ) {
      return res.status(400).json({
        message: "Rating factors must be between 0 and 5.",
      });
    }
    const weightOfContract = 0.5
    const weightGeneral = 0.25

    const newRating = (
      professionalism * weightGeneral +
      timelyPayments * weightGeneral +
      adherenceToContract * weightOfContract
    ).toFixed(2);
    const updatedRating = Math.min(newRating, 5);
    buyer.rating = updatedRating;
    await Buyer.save();
    return res.status(200).json({
      message: "buyer rating updated successfully!",
      rating: buyer.rating,
    });
  } catch (error) {
    console.error("Error updating buyer rating:", error);
    return res.status(500).json({
      message: "Failed to update buyer rating. Please try again later.",
      error: error.message,
    });
  }
};

const addContractToBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const { contractId } = req.body;
    const buyer = await Buyer.findOne({ where: { buyerId } });
    if (!buyer) {
      return res.status(404).json({
        message: "Buyer not found",
      });
    }
    const contract = await Contract.findOne({ where: { contractId } });
    if (!contract) {
      return res.status(404).json({
        message: "Contract not found",
      });
    }
    buyer.confirmedBids = [...buyer.confirmedBids, contract];
    await buyer.save();
    return res.status(200).json({
      message: "Contract added to buyer successfully!",
      contracts: buyer.confirmedBids,
    });
  } catch (error) {
    console.error("Error adding contract to buyer:", error);
    return res.status(500).json({
      message: "Failed to add contract to buyer. Please try again later.",
      error: error.message,
    });
  }
};

const addContractToBuyerConfirmedBids = async (buyerId, contractId) => {
  const buyer = await Buyer.findOne({ where: { buyerId } });
  if (!buyer) {
    throw new Error("Buyer not found");
  }

  buyer.confirmedBids = [...buyer.confirmedBids, contractId];
  await buyer.save();
};

const postCropDemand = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const { crop, category, rangeOfPricesMin, rangeOfPricesMax, quantity, sampleTest, location, time, transportationFacility } = req.body;

    const buyer = await Buyer.findOne({ where: { buyerId } });
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });    }

    const newCropDemand = await CropDemand.create({
      cropDemandId: "CD" + Date.now(),
      crop,
      category,
      rangeOfPricesMin,
      rangeOfPricesMax,
      quantity,
      sampleTest,
      location,
      time,
      transportationFacility,
      buyerId,
    });
    buyer.postedRequirements = [...buyer.postedRequirements, newCropDemand.cropDemandId];
    await buyer.save();

    return res.status(201).json({
      message: "Crop demand posted successfully!",
      cropDemand: newCropDemand,
    });
  } catch (error) {
    console.error("Error posting crop demand:", error);
    return res.status(500).json({
      message: "Failed to post crop demand. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = { registerBuyer, getBuyer, getAllBuyers, addContractToBuyer, updateBuyerRating, postCropDemand, addContractToBuyerConfirmedBids };

