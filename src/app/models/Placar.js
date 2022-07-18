//importa as dependencias
const mongoose = require('mongoose');

//schema do Placar
const PlacarSchema = new mongoose.Schema({
    dataPartida: {
        type: Date,
        required: true,
        createIndexs: {
            unique: true,
        },
    },
    segundoQuadro: {
        segundoColisao: {
            type: Number,
            required: true,
        },
        segundoAdversario: {
            type: Number,
            required: true,
        },
    },
    primeiroQuadro: {
        primeiroColisao: {
            type: Number,
            required: true,
        },
        primeiroAdversario: {
            type: Number,
            required: true,
        },
    },
});

module.exports = mongoose.model('Placar', PlacarSchema);
