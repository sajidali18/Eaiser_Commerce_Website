const user = require('../../models/UserSchema')

const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const validator = require('validator')
const rateLimit = require("express-rate-limit");



const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: 'mohammedsajid8787@gmail.com',
        pass: 'ajicupvtsrtghlxb'
    }
});


const sendOtp = async (Email, OTP) => {

    const mailoption = {
        from: 'Mohammed Sajid <noreply@gmail.com>',
        to: Email,
        subject: `${OTP} - OTP For Verification`,
        html: `<h5 style="font-size: 25px;">OTP Verification Code</h5>
               <P>Hi there, <br> <br>Please enter the below code to complete verification:</P>
               <h1>${OTP}</h1>`
    }

    transporter.sendMail(mailoption, (error, info) => {
        if (error) {
            console.error('Error', error)
        }
        else {
            console.log('Email sent', info.response)
        }
    })
    return OTP;
}

const otpLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 1, // Limit each email to 1 request per windowMs
    keyGenerator: function (req) {
        // Use the user's email as the key for rate limiting
        return req.body.email;
    },
    message: "Too many OTP requests for this email, please try again later",
});

const generateotp = () => {
    let otp = '';
    let character = '012456789'
    characterlength = character.length;
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * characterlength);
    }
    return otp;
}

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

const Userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format. Please provide a valid email.", success: false });
        }

        const validuser = await user.findOne({ email });
        // console.log(validuser);
        if (!validuser)
            return res.status(404).json({
                messsage: "Invalid Credentials",
            });

        const pass_match = await bcrypt.compare(password, validuser.password);

        if (!pass_match)
            return res.status(404).json({ message: "Invalid Credentials" });

        // Generate OTP
        const OTP = generateotp();

        //need to save otp in database
        saveOtpToDatabase(email, OTP);

        // Send OTP via email
        sendOtp(email, OTP);

        req.session.email = email;

        return res.status(200).json({
            message: "OTP Sent to your mail!!! Verify OTP to proceed",
            success: true
        })
    }
    catch (err) {
        console.error("error : ", err);
        res.status(500).json({ message: "internal server error", error: err.message });
    }
}
module.exports = { Userlogin: Userlogin, otpLimiter: otpLimiter };