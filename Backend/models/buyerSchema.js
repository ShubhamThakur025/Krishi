const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Buyer = sequelize.define("Buyer", {
    buyerId: {
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
        type: DataTypes.TEXT 
    },
    location: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    ratings: {
        type: DataTypes.DECIMAL(2, 1),
        validate: { min: 1, max: 5 }
    },
    filledBids: {
        type: DataTypes.TEXT,
        defaultValue: '[]'
    },
    confirmedBids: {
        type: DataTypes.TEXT,
        defaultValue: '[]'
    }
});

module.exports = Buyer;
