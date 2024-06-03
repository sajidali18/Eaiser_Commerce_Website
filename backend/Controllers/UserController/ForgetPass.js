const user = require('../../models/UserSchema');
const validator = require('validator');
const nodemailer = require('nodemailer')
const rateLimit = require("express-rate-limit");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host:"smtp.ethereal.email",
    port: "587",
    auth:{
    user: 'mohammedsajid8787@gmail.com',
    pass: 'ajicupvtsrtghlxb'
    }
})

const sendOtp = async (Email, OTP) => {
    const mailoption = {
        from: 'mohammedsajid <noreply@gmail.com',
        to: Email,
        subject: `${OTP} - OTP For Verification`,
        html: `<h5 style="font-size: 25px;">OTP Verification Code</h5>
               <P>Hi there, <br> <br>Please enter the below code to complete verification:</P>
               <h1>${OTP}</h1>`
    }
    transporter.sendMail(mailoption, (error, info) => {
        if (error) {
            console.error('Error', error);
        }
        else {
            console.log("email sent", info.response);
        }
    })
}

const otpLimiters = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 1, // Limit each email to 1 request per windowMs
    keyGenerator: function (req) {
        // Use the user's email as the key for rate limiting
        return req.body.email;
    },
    message: "Too many OTP requests for this email, please try again later",
});

const saveOtpToDatabase = async (email, otp) => {
    try {
        // Find the user by email
        const userToUpdate = await user.findOne({ email });
        if (userToUpdate) {
            // Update the user document with the OTP and its creation time
            userToUpdate.otp.code = otp;
            userToUpdate.otp.createdAt = new Date();
            await userToUpdate.save();
            console.log(`Saved OTP ${otp} for user ${email}.`);
        } else {
            console.error(`User with email ${email} not found.`);
        }
    } catch (err) {
        console.error(`Error saving OTP to database: ${err}`);
    }
};

const generateotp = () => {
    let otp = '';
    let char = '123456789';
    let character = char.length;
    for (let i = 0; i < 6; i++){
        otp += Math.floor(Math.random() * character);
    }
    return otp;
}

const ForgetPass = async(req, res) => {
    try {
        const { email } = req.body;
        if (!validator.isEmail(email))
            return res.json(400).json({ messsage: "invalid email format, plz provide valid email format" });
        const validuser = await user.findOne({ email })
        if (!validuser)
            return res.status(400).json({ message: "invalid credentials" });

        const OTP = generateotp();
        
        saveOtpToDatabase(email, OTP);


        sendOtp(email, OTP);

        req.session.email = email;

        return res.status(200).json({ message: "Otp sent successfully in your email,, plz verify" });

    }
    catch (err) {
        console.error("Error", err);
        res.status(500).json({ message: "internal server error", Error: err.message });
    }
}

module.exports = { ForgetPass:ForgetPass, otpLimiters:otpLimiters};