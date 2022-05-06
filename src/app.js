/* criar rota para excluir todos os bids apos determindo dia */
require('dotenv').config({ path: `${__dirname}/config/config.env` });

const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const bidRouter = require('./rotas/bidRouter');
const rotaAdm = require('./rotas/rotaAdm');
const authRouter = require('./rotas/authRouter');
const placarRouter = require('./rotas/placarRouter');
//import as rotas
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    req.requestTime = new Date().toLocaleString('pt-Br', {
        timeZone: 'America/Sao_Paulo',
    });
    next();
});
app.use((req, res, next) => {
    req.io = io;
    return next();
});
app.use('/api/colisao/v2/auth', authRouter);
app.use('/api/colisao/v2/bid', bidRouter);
app.use('/api/colisao/v2/rotasAdm', rotaAdm);
app.use('/api/colisao/v2/placar', placarRouter);

module.exports = app;
