const express = require('express');
const Placar = require('../models/Placar');
const router = express.Router();
const auth = require('../midleware/auth');

router.use(auth);
router.post('/criaPlacar',async(req,res)=>{
    //console.log(checkBid);
    const criaPlacar = await Placar.create(req.body);
	const listaPlacar = await Placar.find({}).sort('data');
   	req.io.emit('placar',listaPlacar);
	return res.json({
                    success:true,
                    message:'usuario Cadastrado com SUCESSO',
                    });  

});
router.delete('/deletar/:id',async(req,res)=>{
    const deletaPlacar = await Placar.findById(req.params.id).deleteOne();
    const novoPlacar = await Placar.find({}).sort('data');
    req.io.emit('placar',novoPlacar);
    return res.json({success:true,message:'deletado com sucesso'});
});


router.post('/update',async(req,res)=>{
    //console.log(checkBid);
    const criaPlacar = await Placar.findById(req.body._id);
    criaPlacar.set(req.body);
    await criaPlacar.save();
	
	const listaPlacar = await Placar.find({}).sort('data');
   	req.io.emit('placar',listaPlacar);
	return res.json({
                    success:true,
                    message:'usuario Cadastrado com SUCESSO',
                    });  

});
router.get('/editar/:id',async(req,res)=>{

	const editarPlacar = await Placar.findById(req.params.id);
	return res.json(editarPlacar);
});


module.exports = app => app.use('/placar',router);

