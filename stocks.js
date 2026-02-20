const express = require('express');
const Stock = require('../models/Stock');

const router = express.Router();

// Save stock holdings
router.post('/add', async (req, res) => {
    try {
        const stock = new Stock(req.body);
        await stock.save();
        res.json({ message: "Stock added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user stock holdings
router.get('/:userId', async (req, res) => {
    try {
        const stocks = await Stock.find({ userId: req.params.userId });
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

const axios = require('axios');

// AI Optimization Route
router.post('/optimize', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5001/optimize', { stocks: req.body.stocks });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
