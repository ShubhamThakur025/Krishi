const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CropSupply = sequelize.define("CropSupply", {
    cropSupplyId: {
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
    farmerId: {
        type: DataTypes.STRING
    },
    bidderBuyers: {
        type: DataTypes.TEXT
    }
});

module.exports = CropSupply;
