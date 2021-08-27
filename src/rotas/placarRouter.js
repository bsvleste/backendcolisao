const express = require('express');
const PlacarController = require('../app/controller/PlacarController');
const BidController = require('../app/controller/BidController');

const router = express.Router();

router.route('/').get(PlacarController.getPlacar);
router.route('/status').get(BidController.getStatus);
module.exports = router;
