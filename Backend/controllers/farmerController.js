const Farmer = require("../models/farmerSchema"); 

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

    return res.status(200).json({
      message: "Farmer details retrieved successfully!",
      farmer,
    });
  } catch (error) {
    console.error("Error fetching farmer details:", error);
    return res.status(500).json({
      message: "Failed to retrieve farmer details. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = {
  registerFarmer,
  getFarmer,
};
