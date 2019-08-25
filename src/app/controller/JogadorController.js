const express = require('express');
const Jogador = require('../models/Jogador');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../midleware/auth');

//router.use(auth);
router.get('/',async(req,res)=>{
    //console.log(checkBid);
    const listaJogadores = await Jogador.find({},{isAdm:0,email:0});
    
    return res.json(listaJogadores);  

});


module.exports = app => app.use('/jogador',router);

