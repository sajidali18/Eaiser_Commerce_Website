const mongoose = require('mongoose');
const validator = require('validator')

const userschema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error("email is invalid, plz provide an valid email")
        //     }
        // }
    },
    password: {
        type: String,
        required: true,
    },
    create_passward: {
        type: String,
    },
    confirm_passward: {
        type: String,
    },
    phone_number: {
        type: Number,
        unique: true,
    },
    otp: {
        code: {
            type: String,
            default: null,
        },
        createdAt: {
            type: Date,
            default: null
        }
    },
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    contact: [{
        FullName: {
            type: String,
            required: true
        },
        MobileNumber: {
            type: Number,
            unique: true,
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        PinCode: {
            type: Number,
            required: true
        },
        locality: {
            type: String,
            required: true
        },
        landmark: {
            type: String
        }
    }]
})
const User = mongoose.model("useres", userschema);
module.exports = User;


