const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const connectdb = require('./config/db');
const productroutes = require('./routes/ProductRoutes');
const UserRoutes = require('./routes/UserRoutes')
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require("body-parser");



dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));


connectdb();

const PORT = process.env.PORT || 5000 || 6000
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(session({
    secret: 'hjasvxhjvas1423', // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
}));

app.use("/eiser/products", productroutes);
app.use('/users', UserRoutes)

app.get('/', (req, res) => {
    res.send("hello this side from the server side");
})
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})



















