//importa as dependencias
const express = require('express');
const Jogador = require('../models/Jogador');
const config = require('../../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');
const router = express.Router();

router.post('/create',async(req,res)=>{
            try{
            const {nome,email,senha } = req.body.userData;
            const userDataSalve ={
                nome,
                email,
                senha,
            }
            //console.log(userDataSalve);

            if(await Jogador.findOne({email}))
                return res.json({
                    success:false,
                    message:'Usuario Ja Cadastrado',
                    }).status(401); 
            
            const criaJogador = await Jogador.create(userDataSalve);
            return res.json({
                    success:true,
                    message:'usuario Cadastrado com SUCESSO',
                    });          
        }catch(err)
        {
            //console.log(err);
            return res.status(401).json({success:false,message:'Não foi possivel Cadastrar'});
        }
        /*
        console.log(userDataSalve);
        const criaJogador = await Jogador.create(userDataSalve,(err,result)=>{
            if(!err){
                return res.json({
                    success:true,
                    message:'usuario Cadastrado com SUCESSO',
                    });
            }else{
                return res.json({
                    success:false,
                    message:'Nao foi possivel CADASTRAR ',
                    });
            }
        });
        */
        //avisa que novo tweet foi criado
        //req.io.emit('jogador',criaJogador);
        
            

});
router.post('/login',async(req,res)=>{
        const {email,senha} = req.body.userData;
        const usuario = await Jogador.findOne({email}).select('+senha');

        if(email === undefined || email === '' || senha ===undefined || senha === '' )
            return res.json({
                success:false,
                message:"Preencha Todos Os Campos"
            });
        if(!usuario)
            return res.json({
                success:false,
                message:"Usuario Não Encontrado"
            });

        if(! await bcrypt.compareSync(senha, usuario.senha))
            return res.json({
                success:false,
                message:"Usuario Ou Senha Invalidos"
            });

        usuario.senha = undefined;

        const generetionToken = jwt.sign({id:usuario.id}, config.JWT_KEY);
        const isAdmToken = jwt.sign({id:usuario.id}, config.JWT_KEY);
        
        if(usuario.isAdm){
            return res.json({
                isAdm:isAdmToken,
                success:true,
                message:"Logado",
                token:generetionToken,
                usuario,
            });
        }
        else{
            return res.json({
            success:true,
            message:"Logado",
            token:generetionToken,
            usuario,
        });
            console.log('else');
        }
        
});


router.post('/forgot_password',async(req,res)=>{
    const { email } = req.body.userData;
    try{
        const user = await Jogador.findOne({ email });
        console.log(user);
        if(!user)
           return res.json({message:"Usuario não cadastrado"});

        const token = crypto.randomBytes(20).toString('hex');
        const now  = new Date();
        now.setHours(now.getHours()+1);

        await Jogador.findOneAndUpdate(user.id,{
            '$set':{
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to:email,
            from:'teste@gmail.com',
            template:'auth/forgot_password',
            context:{ token },

        },(err)=>{
            if(err)
                return res.status(400).send({erro:'Nao foi possivel mudar a senha'});

            return res.send();
        })
    }catch(err){
            return res.status(401).send({message:"Não foi possivel trocar senha, tente novamente"});
    }

});
router.post('/reset_password',async(req,res)=>{
    const { email, token, senha} = req.body.userData;

    try{
        const user = await Jogador.findOne({ email }).select('+passwordResetToken passwordResetExpires');
        
        //console.log(user);
        
        if(!user)
            return res.status(400).send({error:"Usuario invalido"});

        if(token !== user.passwordResetToken)
            return res.status(400).send({error:"Token Invalido"});

        const now  = new Date();
        if(now > user.passwordResetExpires)
            return res.status(400).send({error:"Token expirado"});

        user.senha = senha;

        await user.save();

        res.send();
    }catch(err){
        return res.status(400).send({error:"Não foi posivel alterar a senha"});
    }
})
module.exports = app => app.use('/auth',router);


/*
module.exports = {
    async index(req,res){
        const listaJogadores = await  Jogador.find({}).sort('nome');
        //testa essa qery

        //const listaJogadores = await  Jogador.find({"mensalidade._id":3},{mensalidade:{ $elemMatch:{descricao:"marco"}}},{_id:0}).sort('nomeUsuario');
        //testar essa consulta
        //db.meses.aggregate({$match:{"mensalidade.nome":"bruno"}},{$unwind:"$mensalidade"},{$match:{"mensalidade.nome":"bruno"}}).pretty()
        return res.json(listaJogadores);
    },
    async login(req,res){
        
        const {email,senha} = req.body.userData;
        const listaJog = await Jogador.findOne({email}).select('+senha');
        if(!listaJog)
            return res.json({success:false,
                             code:"Erro ao Logar",
                             message:"Usuario não encontrado"})
        //const teste = await bcrypt.compare(senha);
        //console.log(teste);
        if(email === undefined || email ==='' || senha === '' || senha === undefined)
            {
                res.status(401).json({
                    success:false,
                    code:"Erro ao logar xiii",
                    message:"Email ou senha invadidos"
                })
            }else{
                //console.log(listaJog);
                if(bcrypt.compareSync(senha,listaJog[0].senha))
                {
                    let tokenData={
                        id:001
                    }
                    let generationToken = jwt.sign(tokenData,config.JWT_KEY,{expiresIn:'2m'});
                    res.json({
                        success:true,
                        token:generationToken
                    })
                }else{
                    res.status(401).json({
                        success:false,
                        code:"Erro ao logar",
                        message:"Email ou senha invadidos"
                    })
                }
                    
            }
        
    },
    async store(req,res){
        //cria tweets
        try{
            const {nome,email,senha } = req.body.userData;
            const userDataSalve ={
                nome,
                email,
                senha,
            }
            console.log(userDataSalve);

            if(await Jogador.findOne({email}))
                return res.json({
                    success:false,
                    message:'Usuario Ja Cadastrado',
                    }).status(401); 
            
            const criaJogador = await Jogador.create(userDataSalve);
            return res.json({
                    success:true,
                    message:'usuario Cadastrado com SUCESSO',
                    });          
        }catch(err)
        {
            console.log(err);
            return res.status(401).json({success:false,message:'Não foi possivel Cadastrar'});
        }
        /*
        console.log(userDataSalve);
        const criaJogador = await Jogador.create(userDataSalve,(err,result)=>{
            if(!err){
                return res.json({
                    success:true,
                    message:'usuario Cadastrado com SUCESSO',
                    });
            }else{
                return res.json({
                    success:false,
                    message:'Nao foi possivel CADASTRAR ',
                    });
            }
        });
        */
        //avisa que novo tweet foi criado
        //req.io.emit('jogador',criaJogador);
        
            

