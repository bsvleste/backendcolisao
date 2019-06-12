const express = require('express');
const Jogador = require('../models/Jogador');
const Mensalidade = require('../models/Mensalidade');
const config = require('../../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../midleware/auth');

router.use(auth);
router.get('/',async(req,res)=>{

    const listaMensalidade = await  Mensalidade.find({}).sort('_id');
    
    return res.json(listaMensalidade);            
});
router.get('/:nome',async(req,res)=>{
    const listaMensalidade = await  Mensalidade.aggregate([{$match:{"mensalidade.nome":req.params.nome}},
                                                              {$unwind:"$mensalidade"},
                                                              {$match:{"mensalidade.nome":req.params.nome}}]).sort('_id');
    return res.json(listaMensalidade);
})

router.get('/descricao/:mes',async(req,res)=>{
    const {mes} = req.params;
    const listaMensalidade = await  Mensalidade.find({descricao:mes});
    return res.json(listaMensalidade);
})
router.post('/create',async(req,res)=>{
    try {
        const listaJogador = await Jogador.find({},{email:0,senha:0,isAdm:0,mensalidade:0,__v:0});
        const  nome  = listaJogador;
        var meses =['janeiro','fevereiro','março','abril','maio','junho',
                    'julho','agosto','setembro','outubro','novembro','dezembro'];
        var mes=[];
        for(var i =0 ;i< meses.length ;i++)
        {
            mes.push({_id:i+1,descricao:meses[i],mensalidade:[]});
            for(var jogadores of nome)
            { 
                mes[i].mensalidade.push({_id:jogadores._id,nome:jogadores.nome,valor:0,status:"pendente"});
            }
        }      
        //console.log(mes);
        const criaMensalidade = await Mensalidade.create(mes);
        //avisa que novo tweet foi criado
        //req.io.emit('jogador',criaJogador);
        console.log('criado com sucesso');
        return res.json(criaMensalidade);
        // statements
    } catch(error) {
        // statements
        return res.status(401).send({error:'Não foi possivel criar as mensalidades'})
    }

        
});
router.post('/update',async(req,res)=>{
    
    const {_id,id,descricao,valor,status,nome} = req.body;
    const updateJogador = await Mensalidade.updateOne({'_id':id,"mensalidade._id":_id},
    {$set:{"mensalidade.$.status":status,"mensalidade.$.valor":valor}});

    return res.json(updateJogador);
})
module.exports = app => app.use('/mensalidade',router);

/*

//importa as dependencias
const express = require('express');
const Mensalidade = require('../models/Mensalidade');
const Jogador = require ('../models/Jogador');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    //busca todas as mensalidades
    async index(req,res){
        const listaMensalidade = await  Mensalidade.find({}).sort('_id');
        return res.json(listaMensalidade);
    },
    
    //busca por nome todas as mensalidades
    async buscaNome(req,res){
        const listaMensalidade = await  Mensalidade.aggregate([{$match:{"mensalidade.nome":req.params.nome}},
                                                              {$unwind:"$mensalidade"},
                                                              {$match:{"mensalidade.nome":req.params.nome}}]).sort('_id');
        return res.json(listaMensalidade);
    },
    /*async buscaMes(req,res)
    {
        const listaMensalidade = await Mensalidade.find({descricao:req.params.descricao});
        return res.json(listaMensalidade);
    },*/
    //cria as mensalidades
   /* async store(req,res){
        const listaJogador = await Jogador.find({},{email:0,senha:0,isAdm:0,mensalidade:0,__v:0});
        const  nome  = listaJogador;
        var meses =['janeiro','fevereiro','março','abril','maio','junho',
                    'julho','agosto','setembro','outubro','novembro','dezembro'];
        var mes=[];
        for(var i =0 ;i< meses.length ;i++)
        {
            mes.push({_id:i+1,descricao:meses[i],mensalidade:[]});
            for(var jogadores of nome)
            { 
                mes[i].mensalidade.push({_id:jogadores._id,nome:jogadores.nome,valor:50,status:"pendente"});
            }
        }      
        console.log(mes);
        const criaMensalidade = await Mensalidade.create(mes);
        //avisa que novo tweet foi criado
        //req.io.emit('jogador',criaJogador);
        return res.json(criaMensalidade);
    },
    
    async update(req,res)
    {
        const id_mes = req.params.id;
        const where = {'_id':id_mes};
        //pegar o id do novo usuario e fazer um objeto nele
        //cosnt id_usuario = req.params.id
        //const updateUsuario = { _id:id_usuario,nome:req.body.nome,valor:req.body.valor}
        const set = { $addToSet:{'mensalidade':req.body }};
        const updateMensalidade = await Mensalidade.update(where,set);

        return res.json(updateMensalidade);

    },
    async updateOne(req,res)
    {
        const valor = req.body.valor;
        const status = req.body.status;

        const updateJogador = await Mensalidade.updateOne({'_id':req.params.id_mes,"mensalidade._id":req.params.id_user},
        {$set:{"mensalidade.$.status":status,"mensalidade.$.valor":valor}});

        return res.json(updateJogador);
    }
}*/