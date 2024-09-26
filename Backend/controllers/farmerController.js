const Farmer = require("../models/farmerSchema");
const Contract = require('../models/contractSchema');
const CropDemand = require('../models/cropDemandSchema')

const registerFarmer = async (req, res) => {
  try {
    const { name, mobile, photo, generalCrops, location } = req.body;
    if (!name || !mobile) {
      return res.status(400).json({
        message: "Name and mobile are required fields.",
      });
    }
    const farmerId = "FID" + Date.now();

    const newFarmer = await Farmer.create({
      farmerId,
      name,
      mobile,
      photo: photo || null,
      generalCrops: generalCrops || null,
      location: location || null,
    });

    return res.status(201).json({
      message: "Farmer account created successfully!",
      farmer: newFarmer,
    });
  } catch (error) {
    console.error("Error creating farmer:", error);
    return res.status(500).json({
      message: "Failed to create farmer. Please try again later.",
      error: error.message,
    });
  }
};

const getFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const farmer = await Farmer.findOne({ where: { farmerId } });
    if (!farmer) {
      return res.status(404).json({
        message: "Farmer not found",
      });
    }

    return res.status(200).json(farmer);
  } catch (error) {
    console.error("Error fetching farmer details:", error);
    return res.status(500).json({
      message: "Failed to retrieve farmer details. Please try again later.",
      error: error.message,
    });
  }
};

const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.findAll();
    return res.status(200).json({
      message: "Farmers retrieved successfully!",
      farmers,
    });
  } catch (error) {
    console.error("Error fetching farmers:", error);
    return res.status(500).json({
      message: "Failed to retrieve farmers. Please try again later.",
      error: error.message,
    });
  }
};

const updateFarmerRating = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const { qualityOfCrops, timelyDeliveries, adherenceToContract } = req.body;
    const farmer = await Farmer.findOne({ where: { farmerId } });
    if (!farmer) {
      return res.status(404).json({
        message: "Farmer not found",
      });
    }
    if (
      qualityOfCrops < 0 || qualityOfCrops > 5 ||
      timelyDeliveries < 0 || timelyDeliveries > 5 ||
      adherenceToContract < 0 || adherenceToContract > 5
    ) {
      return res.status(400).json({
        message: "Rating factors must be between 0 and 5.",
      });
    }
    const weightOfContract = 0.5
    const weightGeneral = 0.25

    const newRating = (
      qualityOfCrops * weightGeneral +
      timelyDeliveries * weightGeneral +
      adherenceToContract * weightOfContract
    ).toFixed(2);
    const updatedRating = Math.min(newRating, 5);
    farmer.rating = updatedRating;
    await farmer.save();
    return res.status(200).json({
      message: "Farmer rating updated successfully!",
      rating: farmer.rating,
    });
  } catch (error) {
    console.error("Error updating farmer rating:", error);
    return res.status(500).json({
      message: "Failed to update farmer rating. Please try again later.",
      error: error.message,
    });
  }
};

const addContractToFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const { contractId } = req.body;

    const farmer = await Farmer.findOne({ where: { farmerId } });
    if (!farmer) {
      return res.status(404).json({
        message: "Farmer not found",
      });
    }
    const contract = await Contract.findOne({ where: { contractId } });
    if (!contract) {
      return res.status(404).json({
        message: "Contract not found",
      });
    }
    farmer.confirmedBids = [...farmer.confirmedBids, contract];
    await farmer.save();
    return res.status(200).json({
      message: "Contract added to farmer successfully!",
      contracts: farmer.confirmedBids,
    });
  } catch (error) {
    console.error("Error adding contract to farmer:", error);
    return res.status(500).json({
      message: "Failed to add contract to farmer. Please try again later.",
      error: error.message,
    });
  }
};

const applyForCropDemand = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const { cropDemandId } = req.body;

    const farmer = await Farmer.findOne({ where: { farmerId } });
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    const cropDemand = await CropDemand.findOne({ where: { cropDemandId } });
    if (!cropDemand) {
      return res.status(404).json({ message: "Crop demand not found" });
    }
    farmer.filledRequirements = [...farmer.filledRequirements, cropDemandId];
    await farmer.save();

    return res.status(200).json({
      message: "Successfully applied for the crop demand!",
      filledRequirements: farmer.filledRequirements,
    });
  } catch (error) {
    console.error("Error applying for crop demand:", error);
    return res.status(500).json({
      message: "Failed to apply for crop demand. Please try again later.",
      error: error.message,
    });
  }
};

const addContractToFarmerConfirmedBids = async (farmerId, contractId) => {
  const farmer = await Farmer.findOne({ where: { farmerId } });
  if (!farmer) {
    throw new Error("Farmer not found");
  }

  farmer.confirmedBids = [...farmer.confirmedBids, contractId];
  await farmer.save();
};

module.exports = { registerFarmer, getFarmer, getAllFarmers, updateFarmerRating, addContractToFarmer, addContractToFarmerConfirmedBids, applyForCropDemand };
