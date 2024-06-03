const express = require('express');
const { UserSignup } = require('../Controllers/UserController/SignupController');
const { route } = require('./ProductRoutes');
const { Userlogin, otpLimiter } = require('../Controllers/UserController/LoginController');
const Otpvalidation = require('../Controllers/UserController/Otpvalidation');
const { ForgetPass, otpLimiters } = require('../Controllers/UserController/ForgetPass');
const ValidOtp = require('../Controllers/UserController/ValidOtp');
const GetUserbyid = require('../Controllers/UserController/getuserbyid');
// const UpdatePass = require('../Controllers/UserController/Creatpass');
const {
    processPayment,
    sendStripeApiKey,
} = require("../Controllers/UserController/PaymentController");
const ContactDetail = require('../Controllers/UserController/ContactDetail');
const deleteaddress = require('../Controllers/UserController/DeleteAdd');
const DeleteAdd = require('../Controllers/UserController/DeleteAdd');
// const { isAuthenticatedUser } = require("../middleware/auth");


const router = express.Router();



router.route("/payment/process").post(processPayment);
router.route("/stripeapikey").get(sendStripeApiKey);

router.post("/signup", UserSignup);
router.post("/login", otpLimiter, Userlogin);
router.post('/otpvalidation', Otpvalidation);
router.post('/forgetpass', ForgetPass);
router.post('/ValidOtp', ValidOtp);
router.post('/address', ContactDetail);
// router.patch('/updatepass', UpdatePass);
router.get('/getuser/:userid', GetUserbyid);
router.delete('/deleteadd', DeleteAdd);



module.exports = router;