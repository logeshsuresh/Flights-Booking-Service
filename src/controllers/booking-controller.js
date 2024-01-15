const { BookingService } = require('../services');

const { StatusCodes } = require('http-status-codes');

const { ErrorResponse, SuccessResponse } = require('../utils/common');

const inMemDB = {};

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

async function makePayment(req, res) {
    try {
        const idempotencyKey = req.headers['x-idempotency-key'];
        if (!idempotencyKey) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message : 'idempotency key missing'});
        }
        if (inMemDB[idempotencyKey]) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message : 'cannot retry on a successful payment'});
        }
        const payment = await BookingService.makePayment({
            bookingId: req.body.bookingId,
            userId: req.body.userId,
            totalCost: req.body.totalCost
        });
        inMemDB[idempotencyKey] = idempotencyKey;
        SuccessResponse.data = payment;
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
    createBooking,
    makePayment
}