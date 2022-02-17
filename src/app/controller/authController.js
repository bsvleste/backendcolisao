//importa as dependencias
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Jogador = require('../models/Jogador');

const config = require('../../config/config');

module.exports = {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const usuario = await Jogador.findOne({ email }).select('+senha');

            /*  if (
            email === undefined ||
            email === '' ||
            senha === undefined ||
            senha === ''
        )
            return res.json({
                success: false,
                message: 'Preencha Todos Os Campos',
            }); */
            if (!usuario)
                return res.json({
                    success: false,
                    message: 'Usuario Ou Senha Invalidos',
                });

            if (!(await bcrypt.compare(senha, usuario.senha)))
                return res.json({
                    success: false,
                    message: 'Usuario Ou Senha Invalidos',
                });

            usuario.senha = undefined;

            const generetionToken = jwt.sign(
                { id: usuario.id },
                config.JWT_KEY
            );
            const isAdmTokens = jwt.sign({ id: usuario.id }, config.JWT_ADM);

            if (usuario.isAdm) {
                return res.json({
                    isAdm: isAdmTokens,
                    success: true,
                    message: 'Logado',
                    token: generetionToken,
                    usuario,
                });
            }
            return res.json({
                success: true,
                message: 'Logado',
                usuario,
                token: generetionToken,
            });
        } catch (error) {
            return res.json({
                message: 'Login errro',
                err: `${error}`,
            });
        }
    },
};
