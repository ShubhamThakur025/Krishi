const Buyer = require("../models/buyerSchema")

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
      message: "Buyer details retrieved successfully!",
      buyer: {
        buyerId: buyer.buyerId,
        name: buyer.name,
        mobile: buyer.mobile,
        photo: buyer.photo,
        generalCrops: buyer.generalCrops,
        location: buyer.location,
        category: buyer.category,
        ratings: buyer.ratings,
        filledBids: JSON.parse(buyer.filledBids), 
        confirmedBids: JSON.parse(buyer.confirmedBids), 
      },
    });
  } catch (error) {
    console.error("Error fetching buyer details:", error);
    return res.status(500).json({
      message: "Failed to retrieve buyer details. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = {
  registerBuyer,
  getBuyer,
};

 
