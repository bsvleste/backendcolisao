const express = require('express');
const Placar = require('../models/Placar');
const router = express.Router();


router.get('/placar',async(req,res)=>{

    const listaPlacar = await Placar.find({}).sort('data');
    req.io.emit('placar',listaPlacar);
    return res.json(listaPlacar);
});

module.exports = app => app.use('/publicas',router);
