const express = require('express');
const router = express.Router();
const { database } = require('../config/connection');

const {
  userEmailController
} = require("../controller/userEmailController");




router.post('/enter', userEmailController)

module.exports = router;

   