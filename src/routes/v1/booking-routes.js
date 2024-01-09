const express = require('express');

const { BookingController } = require('../../controllers');

const router = express.Router();

// /api/v1/booking POST
router.post('/', 
        BookingController.createBooking);

module.exports = router;