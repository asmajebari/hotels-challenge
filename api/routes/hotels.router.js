const express = require('express');

const { getHotels } = require('../controllers/hotels.controller');

const hotelRouter = express.Router();

hotelRouter.get('/', getHotels);

module.exports = hotelRouter;