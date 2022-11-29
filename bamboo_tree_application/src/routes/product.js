const express = require('express');
const router = express.Router();
const {database} = require('../config/connection');

const {
    productController,prodIdController, treetypeController, 
    categoryController, oneTreeCategoryController, priceController
  } = require("../controller/productController");

/* GET ALL PRODUCTS */
router.get('/', productController )


/* GET ONE PRODUCT*/
router.get('/:prodId', prodIdController)
    

/*GET ALL PRODUCTS FROM ONE TREE TYPE */
router.get('/tree-type/:typeName', treetypeController)
   

/* GET ALL PRODUCTS FROM ONE CATEGORY */
router.get('/category/:catName', categoryController)
   


/* GET ALL PRODUCTS FROM ONE CATEGORY UNDER one TREE TYPE */
router.get('/:typeName/:catName', oneTreeCategoryController)
   

/* GET ALL PRODUCTS FROM ONE CATEGORY UNDER specific price */
router.get('/:typeName/:catName/:Lprice/:Uprice', priceController) //  http://localhost:3636/api/products/tree-name/categoryName/price?page=1
    


module.exports = router