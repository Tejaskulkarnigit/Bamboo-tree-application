const express = require('express');
const router = express.Router();
const {database} = require('../config/connection');


const { OrderController , singleOrderController, 
    OrderDetailsController} = require("../controller/orderController");


// GET ALL ORDERS
router.get('/', OrderController)
   

// Get Single Order
router.get('/:id', singleOrderController)
    

// Place New Order
router.post('/new', OrderDetailsController)
   





module.exports = router;