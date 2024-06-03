const Product = require('../../models/ProductSchema');

const getProductbyid = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        // console.log(product);
        if (!product) return res.status(404).json({ message: "no product found" });
        res.json(product);
    }
    catch (err) {
        console.error(`error in rendering  ${err}`);
        res.status(500).json({ message: "intenal server error", error: err });
    }
}
module.exports = getProductbyid;