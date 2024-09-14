const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Feedback = sequelize.define("Feedback", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    feedback: {
        type: DataTypes.TEXT
    }
});

module.exports = Feedback;
