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
    const listaBid = await  Bid.find({}).populate('usuario').sort('bid');
    return res.json(listaBid);            
});

router.post('/addBid',async(req,res)=>{
    const {bid,usuario}  = req.body.bidData;
    const saveData={
        bid,    
        usuario
    }
    const salvaBid = await Bid.findOneAndUpdate({usuario:saveData.usuario},saveData,{upsert:true})
    const listaBid = await  Bid.find({}).populate('usuario').sort('bid');
    const checkBid = await Bid.aggregate([
    {
        $group: {
            _id: "$bid",
            count: {$sum: 1},
        }
    }
]);
    req.io.emit('contagem',checkBid);
    

    req.io.emit('bid',listaBid);

    return res.json(listaBid);
})
module.exports = app => app.use('/bid',router);

