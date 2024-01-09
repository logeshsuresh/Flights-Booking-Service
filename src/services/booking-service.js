const axios = require('axios');
const { StatusCodes } = require('http-status-codes');
const db = require('../models');
const { ServerConfig } = require('../config');
const AppError = require('../utils/errors/app-error');

// const { BookingRepository } = require('../repositories');

// const bookingRepository = new BookingRepository();

async function createBooking(data) {
    return new Promise((resolve, reject) => {
        const result = db.sequelize.transaction(async function bookingImpl(t) {
            const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
            const flightData = flight.data.data;
            console.log(flight.data);
            if (data.noOfSeats > flightData.totalSeats) {
                reject(new AppError('no of seats requested exceeds max seats available', StatusCodes.BAD_REQUEST));
            }
            resolve(true);
        });  
    });
}

module.exports = {
    createBooking
}