const express = require('express');
const authController = require('../app/controller/authController');
const stockController = require('../app/controller/stockController');

const router = express.Router();
router.route('/create').post(authController.create);
router.route('/login').post(authController.login);
router.route('/').get(stockController.getStock);
module.exports = router;
