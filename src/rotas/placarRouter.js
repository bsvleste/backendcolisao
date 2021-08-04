const express = require('express');
const PlacarController = require('../app/controller/PlacarController');
const authAdm = require('../app/midleware/authAdm');

const router = express.Router();

router.route('/').get(PlacarController.getPlacar);
router.use(authAdm);
router.route('/criaPlacar').post(PlacarController.criarPlacar);
module.exports = router;
