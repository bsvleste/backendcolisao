const express = require('express');
const PlacarController = require('../app/controller/PlacarController');

const router = express.Router();

router.route('/').get(PlacarController.getPlacar);

module.exports = router;
