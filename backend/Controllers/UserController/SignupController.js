const User = require('../../models/UserSchema');
const bcrypt = require("bcrypt");
const validator = require('validator');

const isValidPassword = (password) => {
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegEx.test(password);
}

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

const isValidPhoneNumber = (number) => {
    const numberRegEx = /^(?:\+?91|0)?[6789]\d{9}$/;
    return numberRegEx.test(number);
}

const UserSignup = async (req, res) => {
    try {
        const { user_name, email, password, phone_number } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Validate password, email format, and phone number
        if (!isValidPassword(password)) {
            return res.status(400).json({
                message: "Invalid password format. Create a strong password with minimum 8 characters, including letters, numbers, and symbols.",
                success: false
            });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format. Please provide a valid email.", success: false });
        }
        if (!isValidPhoneNumber(phone_number)) {
            return res.status(400).json({ message: "Invalid mobile number. Please provide a valid mobile number.", success: false });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create a new user document
        const newUser = new User({
            user_name,
            email,
            password: hashedPassword,
            phone_number,
            otp: {
                code: null,
                createdAt: null
            }
        });

        // Save the new user
        await newUser.save();

        res.status(200).json({ message: `Signed up Successfully. Please Login to Continue`, success: true });
    } catch (err) {
        console.error(`Error in signup: ${err}`);
        // Check if the error is due to duplicate key (user already exists)
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(409).json({ message: "User already exists", success: false });
        }
        // For other errors, return a generic error message
        res.status(500).json({ message: "Internal server error", error: err });
    }
};

module.exports = { UserSignup };
