const express = require('express');
const testeMensalidade = require('../app/controller/TesteMensaldiadeController');

const router = express.Router();
router.route('/').get(testeMensalidade.getMensalidades);
/* router.route('/tours-stats').get(tourController.getTourStats);
router.route('/monthly-plain/:year').get(tourController.getMonthPlan);
router.route('/').get(tourController.getTours).post(tourController.createTour);
router
    .route('/:id')
    .patch(tourController.updateTour)
    .get(tourController.getTour)
    .delete(tourController.delete); */
module.exports = router;
