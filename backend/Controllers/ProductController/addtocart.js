const User = require("../../models/UserSchema")
const Product = require('../../models/ProductSchema');

const addToCart = async (req, res) => {
    try {
        // Extract product ID and user ID from request parameters
        const { productId, userId } = req.body;

        // Check if both productId and userId are provided
        if (!productId || !userId) {
            return res.status(400).json({ error: 'Product ID and user ID are required.' });
        }
        // Find the product by its ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Add the product to the user's cart
        user.cart.push(productId);
        await user.save();

        // Return success response
        return res.status(200).json({ message: 'Product added to cart successfully.', user });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};
module.exports = {
    addToCart
};


// const User = require("../../models/UserSchema")
// const Product = require('../../models/ProductSchema');

// const addToCart = async (userId, productId) => {
//     try {
//         let user = await User.findById(userId);
//         if (!user) {
//             throw new Error('User not found');
//         }
//         // Check if the product is already in the user's cart
//         const index = user.cart.findIndex(item => item.productId.toString() === productId.toString());
//         if (index !== -1) {
//             // If the product is already in the cart, increase the quantity
//             user.cart[index].quantity += 1;
//         } else {
//             // If the product is not in the cart, add it to the cart
//             user.cart.push({ productId, quantity: 1 });
//         }
//         await user.save();
//         return user;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// module.exports = {
//     addToCart
// };
