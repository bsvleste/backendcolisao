//importa as dependencias
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../../config/config');
//schema do Jogador
const JogadorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    email: {
        type: String,
        required: true,
        createIndexes: {
            unique: true,
        },
        lowercase: true,
    },
    isAdm: {
        type: Boolean,
        required: true,
        default: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
});

JogadorSchema.pre('save', async function (next) {
    const hash = bcrypt.hashSync(this.senha, config.SALT_ROUND);
    this.senha = hash;

    next();
});
module.exports = mongoose.model('Jogador', JogadorSchema);
