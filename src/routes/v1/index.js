const express = require('express');

const router = express.Router();

const bookingRoutes = require('./booking-routes');
const { InfoController } = require('../../controllers');

router.use('/bookings', bookingRoutes);
router.get('/info', InfoController.info);

module.exports = router;