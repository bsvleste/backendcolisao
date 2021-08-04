//importa as dependencias
const mongoose = require('mongoose');

//schema do Placar
const PlacarSchema = new mongoose.Schema({
    data: {
        type: Date,
        required: true,
        createIndexs: {
            unique: true,
        },
    },
    segundo: {
        colisao: {
            type: Number,
            required: true,
        },
        adversario: {
            type: Number,
            required: true,
        },
    },
    primeiro: {
        colisao: {
            type: Number,
            required: true,
        },
        adversario: {
            type: Number,
            required: true,
        },
    },
});

module.exports = mongoose.model('Placar', PlacarSchema);
