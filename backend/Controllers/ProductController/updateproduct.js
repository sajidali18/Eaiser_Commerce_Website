const Product = require('../../models/ProductSchema')

const updateProduct = async (req, res) => {
    try {
        const id = req.params.Id;
        const updateproduct = req.body;
        const updatedproduct = await Product.findOneAndUpdate(
            { id: id },
            updateproduct,
            {
                new: true,
            }
        );
        if (!updatedproduct) return res.status(400).json({ message: "product not found" });
        res.status(200).json({ message: "product update successfully" });
    }
    catch (err) {
        console.error(`error in updating product : ${err}`)
        res.status(500).json({ message: "internal server error", error: err.message });
    }
}
module.exports = updateProduct;