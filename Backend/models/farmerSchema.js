const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Farmer = sequelize.define("Farmer", {
    farmerId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING
    },
    generalCrops: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },
    location: {
        type: DataTypes.STRING
    },
    ratings: {
        type: DataTypes.DECIMAL(2, 1),
        validate: { min: 1, max: 5 }
    },
    filledBids: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },
    confirmedBids: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    }
});

module.exports = Farmer;
