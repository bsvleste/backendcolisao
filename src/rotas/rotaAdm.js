const express = require('express');
const BidControler = require('../app/controller/BidController');
const PlacarController = require('../app/controller/PlacarController');

const authAdm = require('../app/midleware/authAdm');

const router = express.Router();
router.use(authAdm);
router.route('/criaPlacar').post(PlacarController.criarPlacar);
router.route('/editar/:id').get(PlacarController.editar);
router.route('/deleta/:id').delete(PlacarController.deletaPlacar);
router.route('/update/:id').post(PlacarController.update);
router.route('/deletaBid').post(BidControler.delete);
router.route('/liberaBid').post(BidControler.liberaBid);

module.exports = router;
