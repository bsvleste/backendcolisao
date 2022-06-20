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
                permissions: [''],
                roles: ['editor'],
            };

            if (await Jogador.findOne({ email }))
                return res.json({
                    success: false,
                    message: 'Usuario Ja Cadastrado',
                });

            await Jogador.create(userDataSalve);
            return res.status(200).json({
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
                {
                    id: usuario.id,
                    email: usuario.email,
                    permissions: usuario.permissions,
                    roles: usuario.roles,
                },
                config.JWT_KEY
            );
            const isAdmTokens = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email,
                    permissions: usuario.permissions,
                    roles: usuario.roles,
                },
                config.JWT_ADM
            );
            const { nome, isAdm, id, roles, permissions } = usuario;
            if (usuario.isAdm) {
                return res.json({
                    tokenisAdm: isAdmTokens,
                    token: generetionToken,
                    nome,
                    email,
                    isAdm,
                    id,
                    roles,
                    permissions,
                });
            }
            return res.json({
                nome,
                email,
                isAdm,
                id,
                token: generetionToken,
                roles,
                permissions,
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
        const usuario = await Jogador.findOne({ email }).select('+senha');

        if (!usuario) {
            return res
                .status(401)
                .json({ error: true, message: 'Usuario não encontrado' });
        }
        const { nome, isAdm, id, permissions, roles } = usuario;

        return res.json({
            nome,
            isAdm,
            id,
            email,
            permissions,
            roles,
        });
    },
    async refresh(req, res) {
        return req.json({ message: 'ok' });
    },
};
