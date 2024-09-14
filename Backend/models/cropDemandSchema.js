const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CropDemand = sequelize.define("CropDemand", {
    cropDemandId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    crop: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING
    },
    rangeOfPricesMin: {
        type: DataTypes.DECIMAL(10, 2)
    },
    rangeOfPricesMax: {
        type: DataTypes.DECIMAL(10, 2)
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    sampleTest: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    location: {
        type: DataTypes.STRING
    },
    time: {
        type: DataTypes.DATE
    },
    transportationFacility: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    buyerId: {
        type: DataTypes.STRING
    },
    bidderFarmers: {
        type: DataTypes.TEXT 
    }
});

module.exports = CropDemand;
