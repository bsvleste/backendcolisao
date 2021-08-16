//importa as dependencias
const mongoose = require('mongoose');

//schema do Jogador
const BidSchema = new mongoose.Schema({
    bid: {
        type: Boolean,
        required: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
        require: true,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StatusBidModel',
        require: true,
    },
});

module.exports = mongoose.model('BidModel', BidSchema);
