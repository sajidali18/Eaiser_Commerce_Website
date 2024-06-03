
const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, "plz provide an id"],
        unique: true
    },
    Product_Name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    del_price: {
        type: Number,
        required: true
    },
    image_link: {
        type: String,
        required: true
    },
    sizes: {
        type: Object,
    },
    Pattern: {
        type: String,
    },
    Net_Quantity: {
        type: Number
    },
    CountryOforigin: {
        type: String
    }

})
const Product = mongoose.model("Products", productschema);
module.exports = Product;