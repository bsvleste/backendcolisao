//importa as dependencias
const express = require('express');
const multer = require('multer');

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Jogador = require('../models/Jogador');
const multerconfig = require('../../config/configMulter');

const upload = multer(multerconfig);
const config = require('../../config/config');
const mailer = require('../../modules/mailer');

const router = express.Router();

router.post('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const { filename: image } = req.file;
        const { id } = req.params;

        console.log(req.params.id, image);
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(path.resolve(req.file.destination, 'uploadSize', image));
        //apaga a image grande
        fs.unlinkSync(req.file.path);
        const updateImg = await Jogador.updateOne(
            { _id: id },
            { $set: { fotoPerfil: image } }
        );
        return res.json(updateImg);
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Não foi possivel Cadastrar',
        });
    }
});

router.post('/create', async (req, res) => {
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

        const criaJogador = await Jogador.create(userDataSalve);
        return res.json({
            success: true,
            message: 'usuario Cadastrado com SUCESSO',
        });
    } catch (err) {
        //console.log(err);
        return res.status(401).json({
            success: false,
            message: 'Não foi possivel Cadastrar',
            err: `${err},nao foi possivel cadastrar`,
        });
    }
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body.userData;
    const usuario = await Jogador.findOne({ email }).select('+senha');

    if (
        email === undefined ||
        email === '' ||
        senha === undefined ||
        senha === ''
    )
        return res.json({
            success: false,
            message: 'Preencha Todos Os Campos',
        });
    if (!usuario)
        return res.json({
            success: false,
            message: 'Usuario Não Encontrado',
        });

    if (!(await bcrypt.compareSync(senha, usuario.senha)))
        return res.json({
            success: false,
            message: 'Usuario Ou Senha Invalidos',
        });

    usuario.senha = undefined;

    const generetionToken = jwt.sign({ id: usuario.id }, config.JWT_KEY);
    const isAdmTokens = jwt.sign({ id: usuario.id }, config.JWT_KEY);

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
    });
});

module.exports = (app) => app.use('/auth', router);
