const Product = require('../../models/ProductSchema');

const addproduct = async (req, res) => {
    try {
        const { id,
            Product_Name,
            category,
            price,
            del_price,
            image_link, } = req.body;

        const newproduct = new Product({
            id,
            Product_Name,
            category,
            price,
            del_price,
            image_link,
        });
        const savedproduct = await newproduct.save();
        res.status(200).json({
            message: "product added successfully"
        });
    }
    catch (err) {
        console.error(`error in adding product: ${err}`)
        res.status(500).json({ message: "internal server error", error: err });
    }
}

module.exports = addproduct;