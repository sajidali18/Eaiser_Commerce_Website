const Product = require('../../models/ProductSchema');

const getProduct = async (req, res) => {
    try {
        const product = await Product.find();
        if (!product) return res.status(404).json({ message: "no product found" });
        res.json(product);
    }
    catch (err) {
        console.error(`error in rendering t ${err}`);
        res.status(500).json({ message: "intenal server error", error: err });
    }
}
module.exports = getProduct;


