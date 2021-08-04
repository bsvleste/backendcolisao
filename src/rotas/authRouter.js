const express = require('express');
const authController = require('../app/controller/authController');

const router = express.Router();
router.route('/create').post(authController.create);
router.route('/login').post(authController.login);
module.exports = router;
