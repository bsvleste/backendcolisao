const express = require('express');
const Placar = require('../models/Placar');
const router = express.Router();
const auth = require('../midleware/auth');

//router.use(auth);
router.post('/criaPlacar',async(req,res)=>{
    //console.log(checkBid);
    const criaPlacar = await Placar.create(req.body);
    return res.send("ok");  

});

router.get('/',async(req,res)=>{

	const listaPlacar = await Placar.find({}).sort('data');
	return res.json(listaPlacar);
});
module.exports = app => app.use('/placar',router);

