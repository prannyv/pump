const mongoose = require('mongoose');

const fridgeItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number
});

const FridgeItem = mongoose.model('FridgeItem', fridgeItemSchema);

module.exports = FridgeItem;
