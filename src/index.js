//importa as dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//inicializa o express
const app = express();
//abilita o socket io
const server  = require('http').Server(app);
const io = require('socket.io')(server);
/*servidor online*/
const  porta = process.env.PORT || 8080;
/*servidor no pc*/
//const porta = 3000;
//conexão com o mongodb
mongoose.connect('mongodb://backendcolisao:t3ic0l03@ds155293.mlab.com:55293/backendcolisao',{
    useNewUrlParser:true
});

app.use((req,res,next)=>{
    req.io = io;
    return next();
});
app.use(cors());
app.use(express.json());
require('./app/controller/index')(app);
//rotas 
//app.use(require('./routes'));
//porta onde vai funcionar o servidor
/*server.listen(porta,()=>{
    console.log('Service onLine ');
})*/
server.listen(porta);
