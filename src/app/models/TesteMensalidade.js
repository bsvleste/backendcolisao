const mongoose = require('mongoose');

//schema mensalidade

const TesteSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
    },
    jogador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
        require: true,
    },
    mensalidade: [{}],
});

module.exports = mongoose.model('Teste ', TesteSchema);
