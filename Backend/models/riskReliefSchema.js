const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RiskRelief = sequelize.define("RiskRelief", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    planInfo: {
        type: DataTypes.TEXT
    }
});

module.exports = RiskRelief;
