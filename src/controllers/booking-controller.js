const { BookingService } = require('../services');

const { StatusCodes } = require('http-status-codes');

const { ErrorResponse, SuccessResponse } = require('../utils/common');

async function createBooking(req, res) {
    try {
        const booking = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats
        });
        SuccessResponse.data = booking;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

module.exports = {
    createBooking
}