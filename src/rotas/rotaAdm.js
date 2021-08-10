const express = require('express');
const BidControler = require('../app/controller/BidController');
const PlacarController = require('../app/controller/PlacarController');

const authAdm = require('../app/midleware/authAdm');

const router = express.Router();
router.use(authAdm);
router.route('/deletaBid').delete(authAdm, BidControler.delete);
router.route('/criaPlacar').post(PlacarController.criarPlacar);
router.route('/editar/:id').get(PlacarController.editar);
router.route('/deleta/:id').delete(PlacarController.deletaPlacar);
router.route('/update').post(PlacarController.update);
module.exports = router;
