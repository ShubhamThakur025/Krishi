const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Contract = sequelize.define("Contract", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    farmerId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buyerId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file: {
        type: DataTypes.STRING
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Contract;
