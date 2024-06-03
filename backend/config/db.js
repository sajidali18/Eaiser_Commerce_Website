const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected sucessfully... ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`error connection in ${error}`);
    }
}

module.exports = connectdb;