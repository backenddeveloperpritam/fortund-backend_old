import express from 'express';
const router = express.Router();

import * as kundliController from '../controllers/kundliController.js';

router.post('/add-kundli', kundliController.addKundli);
router.post('/get-customer-kundli', kundliController.getCustomerKundli);
router.post('/delete-kundli', kundliController.deleteKundli);
router.get('/get-all-kundli', kundliController.getAllKundli);

// Planet API
router.post('/get-all-planet-data', kundliController.getAllPlanetData);
router.post('/get-all-upgraha-data', kundliController.getAllUpgrahaData);
router.post('/get-all-dasham-bhavmadhya-data', kundliController.getDashamBhavMadhyaData);
router.post('/get-all-ashtak-varga-data', kundliController.getAshtakVargaData);
router.post('/get-all-sarvashtak-data', kundliController.getSarvashtakData);
router.post('/get-all-transit-data', kundliController.getTransitData);

// Chart API
router.post('/get-lagna-chart', kundliController.getLagnaChart);
router.post('/get-moon-chart', kundliController.getMoonChart);
router.post('/get-sun-chart', kundliController.getSunChart);
router.post('/get-chalit-chart', kundliController.getChalitChart);
router.post('/get-hora-chart', kundliController.getHoraChart);
router.post('/get-dreshkan-chart', kundliController.getDreshkanChart);
router.post('/get-navamansha-chart', kundliController.getNavamanshaChart);
router.post('/get-dashamansha-chart', kundliController.getDashamanshaChart);
router.post('/get-dwadashamansha-chart', kundliController.getDwadashamanshaChart);
router.post('/get-trishamansha-chart', kundliController.getTrishamanshaChart);
router.post('/get-shashtymsha-chart', kundliController.getShashtymshaChart);

// Dasha API
router.post('/get-kalsharp-dosha-analysis', kundliController.kalsharpDoshaAnalysis);
router.post('/get-pitri-dosha-analysis', kundliController.pitriDoshaAnalysis);
router.post('/get-mangal-dosha-analysis', kundliController.mangalDoshaAnalysis);
router.post('/get-sadhesati-analysis', kundliController.sadhesatiAnalysis);

export default router;
