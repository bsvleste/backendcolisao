const express = require('express');
const auth = require('../midleware/auth');
const Jogador = require('../models/Jogador');
const Teste = require('../models/TesteMensalidade');
const router = express.Router();

router.get('/',async (req,res)=>{
	const mensalidade = await Teste.find().populate('jogador');
	return res.json({mensalidade})
});

router.post('/create',async(req,res)=>{
    
		try{
            const {descricao, jogador } = req.body;
            const userDataSalve ={
                descricao,
                jogador
			}
            console.log(userDataSalve);
			const criaMensalidade = await Teste.create(userDataSalve);
	        return res.send({criaMensalidade});
            }catch(err)
            {
            	res.send({err:"ola errr"});
            }

    /*const listaJogador = await Jogador.find({},{email:0,senha:0,isAdm:0,__v:0});
        const nome = listaJogador;
        var meses =['janeiro','fevereiro','março','abril','maio','junho',
                    'julho','agosto','setembro','outubro','novembro','dezembro'];
        var mes=[];
        for(var i =0 ;i< meses.length ;i++) 
        {
            for(var jogadores of nome)
            { 
            	mes.push({descricao:meses[i],mensalidade:[]});
                mes[i].mensalidade.push({valor:50,status:"pendente"});
            }
        }      
        //console.log(mes);
        const criaMensalidade = await Teste.create(mes);
        //avisa que novo tweet foi criado
        //req.io.emit('jogador',criaJogador);*/

})

module.exports = app => app.use('/testeMensalidade', router)  ;