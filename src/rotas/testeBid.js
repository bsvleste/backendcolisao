const express = require('express');
const BidControlerTeste = require('../app/controller/TesteBidController');
const auth = require('../app/midleware/auth');

const router = express.Router();

router.use(auth);
router.route('/').get(BidControlerTeste.getBid);
router.route('/addBid').post(BidControlerTeste.addBid);
module.exports = router;
