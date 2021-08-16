const express = require('express');
const Bid = require('../app/controller/BidController');
const auth = require('../app/midleware/auth');

const router = express.Router();
router.use(auth);
router.route('/').get(Bid.getBid);
router.route('/addBid').post(Bid.addBid);

module.exports = router;
