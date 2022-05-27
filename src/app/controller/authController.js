//importa as dependencias
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Jogador = require('../models/Jogador');

// eslint-disable-next-line node/no-unpublished-require
const config = require('../../config/config');

module.exports = {
    async create(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const userDataSalve = {
                nome,
                email,
                senha,
            };

            if (await Jogador.findOne({ email }))
                return res
                    .json({
                        success: false,
                        message: 'Usuario Ja Cadastrado',
                    })
                    .status(401);

            await Jogador.create(userDataSalve);
            return res.json({
                success: true,
                message: 'usuario Cadastrado com SUCESSO',
            });
        } catch (err) {
            //console.log(err);
            return res.status(401).json({
                success: false,
                message: `Não foi possivel Cadastrar ${err}`,
            });
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const usuario = await Jogador.findOne({ email }).select('+senha');

            if (!usuario)
                return res.status(401).json({
                    error: false,
                    message: 'Usuario Invalido',
                });

            if (!(await bcrypt.compare(password, usuario.senha)))
                return res.status(401).json({
                    error: false,
                    message: 'Usuario Ou Senha Invalidos',
                });

            usuario.senha = undefined;

            const generetionToken = jwt.sign(
                { id: usuario.id, email: usuario.email },
                config.JWT_KEY
            );
            const isAdmTokens = jwt.sign(
                { id: usuario.id, email: usuario.email },
                config.JWT_ADM
            );
            const { nome, isAdm, id } = usuario;
            if (usuario.isAdm) {
                return res.json({
                    tokenisAdm: isAdmTokens,
                    token: generetionToken,
                    nome,
                    email,
                    isAdm,
                    id,
                });
            }
            return res.json({
                nome,
                email,
                isAdm,
                id,
                token: generetionToken,
            });
        } catch (error) {
            return res.json({
                message: 'Login errro',
                err: `${error}`,
            });
        }
    },
    async list(req, res) {
        const { email } = req;
        console.log(email);
        const usuario = await Jogador.findOne({ email }).select('+senha');

        if (!usuario) {
            return res
                .status(401)
                .json({ error: true, message: 'Usuario não encontrado' });
        }
        const { nome, isAdm, id } = usuario;
        console.log('Chamou bebe');
        return res.json({
            nome,
            isAdm,
            id,
            email,
        });
    },
};
