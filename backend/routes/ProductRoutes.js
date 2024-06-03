
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const addproduct = require('../Controllers/ProductController/addproduct');
const deleteProduct = require('../Controllers/ProductController/deleteproduct');
const getProduct = require("../Controllers/ProductController/getproduct");
const getProductbyname = require("../Controllers/ProductController/getproductbyname");
const getProductbycategory = require("../Controllers/ProductController/getproductbycategory");
const updateProduct = require("../Controllers/ProductController/updateproduct");
const updateProductbyname = require("../Controllers/ProductController/updateproductbyname");
const getProductbyid = require("../Controllers/ProductController/getproductbyid");
const { addToCart } = require('../Controllers/ProductController/addtocart');
const deleteProductFromCart = require('../Controllers/ProductController/deleteproduct');


router.post("/addproduct", addproduct);
router.put("/updateproduct/:Id", updateProduct);
router.put("/updateproductbyname/:name", updateProductbyname);
router.delete("/deleteproduct/:productId/:userId", deleteProductFromCart);
router.get("/getproducts", getProduct)
router.get("/getproductbyid/:id", getProductbyid)
router.get("/getproductbyname/:name", getProductbyname)
router.get("/getproductbycategory/:category", getProductbycategory)
router.post('/addToCart', addToCart);


module.exports = router;

