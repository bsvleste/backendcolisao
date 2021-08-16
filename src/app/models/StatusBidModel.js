//importa as dependencias
const mongoose = require('mongoose');

//schema do Jogador
const StatusBid = new mongoose.Schema({
    status: {
        type: Boolean,
        default: false,
        required: true,
    },
});

module.exports = mongoose.model('StatusBidModel', StatusBid);
