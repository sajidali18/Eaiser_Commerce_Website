// const Product = require('../../models/ProductSchema');
// const User = require("../../models/UserSchema");

// const deleteProduct = async (req, res) => {
//     try {
//         const productid = req.params.id;
//         const userid = req.params.id;
//         const product = await Product.findOne({ _id: productid });
//         if (!product) return res.status(400).json({ message: "product not found" });
//         await Product.findOneAndDelete({ id: productid });
//         res.status(200).json({ message: "product deleted succesfully" });
//         const user = await Product.findOne({ _id: userid });
//         await user.cart
//     }
//     catch (err) {
//         console.error(`error occured : ${err}`);
//         res.status(500).json({ message: "internal server error" });
//     }
// }
// module.exports = deleteProduct;

const User = require("../../models/UserSchema");
const Product = require('../../models/ProductSchema');

const deleteProductFromCart = async (req, res) => {
    try {
        // Extract product ID and user ID from request parameters
        const { productId, userId } = req.params;

        // Check if both productId and userId are provided
        if (!productId || !userId) {
            return res.status(400).json({ error: 'Product ID and user ID are required.' });
        }

        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Remove the product object from the user's cart array
        user.cart = user.cart.filter(item => item._id.toString() !== productId);
        // console.log(user.cart);
        await user.save();

        // Return success response
        return res.status(200).json({ message: 'Product deleted successfully from cart.', user });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error deleting product from cart:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = deleteProductFromCart;



