const { addContractToFarmerConfirmedBids } = require('../controllers/farmerController')
const { addContractToBuyerConfirmedBids } = require('../controllers/buyerController')
const Contract = require('../models/contractSchema')

const createContract = async (req, res) => {
    try {
        const { id, farmerId, buyerId, file, startDate, endDate } = req.body;
        const newContract = await Contract.create({
            id,
            farmerId,
            buyerId,
            file,
            startDate,
            endDate,
        });
        await addContractToFarmerConfirmedBids(farmerId, newContract.id);
        await addContractToBuyerConfirmedBids(buyerId, newContract.id);

        return res.status(201).json({
            message: "Contract created and added to confirmedBids successfully!",
            contract: newContract,
        });
    } catch (error) {
        console.error("Error creating contract:", error);
        return res.status(500).json({
            message: "Failed to create contract. Please try again later.",
            error: error.message,
        });
    }
};

const getContract = async (req, res) => {
    try {
      const { contractId } = req.params;
      const contract = await Contract.findOne({ where: { id: contractId } });
  
      if (!contract) {
        return res.status(404).json({
          message: "Contract not found",
        });
      }
  
      return res.status(200).json({
        message: "Contract retrieved successfully!",
        contract,
      });
    } catch (error) {
      console.error("Error retrieving contract:", error);
      return res.status(500).json({
        message: "Failed to retrieve contract. Please try again later.",
        error: error.message,
      });
    }
  };

module.exports = { createContract, getContract }