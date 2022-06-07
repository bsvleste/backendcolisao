const mongoose = require('mongoose');

//schema mensalidade

const MensalidadeSchema = new mongoose.Schema({
    _id: Number,
    descricao: String,
    mensalidade: [
        {
            nome: String,
            valor: {
                type: Number,
                default: 0,
            },
            status: String,
        },
    ],
});
module.exports = mongoose.model('Mensalidade', MensalidadeSchema);
