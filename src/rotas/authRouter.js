const express = require('express');
const authController = require('../app/controller/authController');
const auth = require('../app/midleware/auth');

const router = express.Router();
router.route('/create').post(authController.create);
router.route('/login').post(authController.login);
router.route('/authInfo').get(auth, authController.list);
router.route('/refresh').get(authController.refresh);
module.exports = router;
