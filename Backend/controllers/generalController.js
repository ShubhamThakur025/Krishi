const Farmer = require("../models/farmerSchema");
const Buyer = require("../models/buyerSchema");

const loginUser = async (req, res) => {
    const { mobile } = req.body

    if (!mobile) {
        return res.status(400).json({ message: 'Phone number is required.' })
    }

    try {
        const farmer = await Farmer.findOne({ where: { mobile } })
        if (farmer) {
            return res.status(200).json({ message: 'Login successful', role: 'farmer', user: farmer })
        }
        const buyer = await Buyer.findOne({ where: { mobile } })
        if (buyer) {
            return res.status(200).json({ message: 'Login successful', role: 'buyer', user: buyer })
        }
        return res.status(401).json({ message: 'Phone number not found. Please register.' })

    } catch (error) {
        return res.status(500).json({ message: 'An error occurred during login', error: error.message })
    }
}

module.exports = { loginUser }