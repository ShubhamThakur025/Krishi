require('dotenv').config(); 
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('krishi', 'root', '#abhi0052ak', {
    host: '127.0.0.1', 
    dialect: 'mysql',          
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
