const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    userId: String,
    stockSymbol: String,
    quantity: Number,
    purchasePrice: Number
});

module.exports = mongoose.model('Stock', StockSchema);
