const Product = require('../../models/ProductSchema');

const getProductbycategory = async (req, res) => {
    try {
        const product = await Product.find({category: req.params.category});
        if (!product) return res.status(404).json({ message: "no product found" });
        res.json(product);
    }
    catch (err) {
        console.error(`error in rendering t ${err}`);
        res.status(500).json({ message: "intenal server error", error: err });
    }
}
module.exports = getProductbycategory;