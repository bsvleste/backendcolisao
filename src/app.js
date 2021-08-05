/* criar rota para excluir todos os bids apos determindo dia */
require('dotenv').config({ path: `${__dirname}/config/config.env` });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const testeMensalidadeRotas = require('./rotas/testeMensalidade');
const bidRouter = require('./rotas/bidRouter');
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
app.use('/api/colisao/v2/testeMensalidade', testeMensalidadeRotas);
app.use('/api/colisao/v2/bid', bidRouter);
app.use('/api/colisao/v2/placar', placarRouter);
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('estamo conectado 🤪');
    });

const port = process.env.PORT || 3333;
server.listen(port, () => {
    console.log('Estamos on line 😋');
});
