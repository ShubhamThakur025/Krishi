const Farmer = require("../models/farmerSchema");
const Buyer = require("../models/buyerSchema");
const jwt = require('jsonwebtoken')
require('dotenv').config()

const loginUser = async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).json({ message: 'Phone number is required.' });
    }

    try {
        const farmer = await Farmer.findOne({ where: { mobile } });
        if (farmer) {
            const token = jwt.sign(
                { id: farmer.farmerId, name: farmer.name, mobile: farmer.mobile },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            return res.status(200).json({ message: 'Login successful', role: 'farmer', user: farmer, token });
        }

        const buyer = await Buyer.findOne({ where: { mobile } });
        if (buyer) {
            const token = jwt.sign(
                { id: buyer.buyerId, name: buyer.name, mobile: buyer.mobile },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            return res.status(200).json({ message: 'Login successful', role: 'buyer', user: buyer, token });
        }

        return res.status(401).json({ message: 'Phone number not found. Please register.' });

    } catch (error) {
        return res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
};

module.exports = { loginUser }