const user = require('../../models/UserSchema')
const jwt = require('jsonwebtoken');

const ValidOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        // Retrieve email from the session
        const email = req.session.email;

        console.log(email)
        const validuser = await user.findOne({ email });
        if (!validuser)
            return res.status(404).json({
                messsage: "user not found",
            });
        if (otp != validuser.otp.code)
            return res.status(404).json({ message: "Invalid otp" });

        res.status(200).json({ message: "otp verified sucessfully", success: true });
        // Automatically remove OTP after one minute

        setTimeout(async () => {
            // Find the user by email
            const userToUpdate = await user.findOne({ email });
            if (userToUpdate) {
                // Update the user document to remove the OTP
                userToUpdate.otp.code = null;
                userToUpdate.otp.createdAt = null;
                await userToUpdate.save();
                console.log(`Removed OTP for user ${email} after 1 minute.`);
            }
        }, 60000); // 1 minute in milliseconds

    }
    catch (err) {
        console.error("error : ", err);
        res.status(500).json({ message: "internal server error", error: err.message });
    }
}
module.exports = ValidOtp;
