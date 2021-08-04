const express = require('express');
const PlacarController = require('../app/controller/PlacarController');
const auth = require('../app/midleware/auth');

const router = express.Router();

/* router.use(auth); */
router.route('/').get(PlacarController.getPlacar);
router.route('/criaPlacar').post(PlacarController.criarPlacar);
module.exports = router;
