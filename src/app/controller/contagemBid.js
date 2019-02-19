const express = require('express');
const Jogador = require('../models/Jogador');
const Bid = require('../models/BidModel');
const config = require('../../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../midleware/auth');

router.use(auth);
router.get('/',async(req,res)=>{
    const checkBid = await Bid.aggregate([
    {
        $group: {
            _id: "$bid",
            count: {$sum: 1},
        }
    }
]);
    //req.io.emit('contagem',checkBid);
    //console.log(checkBid);
    return res.json(checkBid);            
});


module.exports = app => app.use('/contagembid',router);

