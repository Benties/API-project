const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { User, Spot, Review, SpotImage, sequelize, ReviewImage, Booking } = require('../../db/models')

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { urlencoded } = require('express');





router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {
        const booking = await Booking.findAll({
            where: {userId: req.user.id},
            include: [
            {
                model: Spot,
                attributes:
                {
                    exclude: ['createdAt', 'updatedAt'],
                },
            },
        ],
    })

    const imgUrl = await SpotImage.findAll({
        where: {spotId: booking[0].Spot.id},
        attributes: ['url'],
        raw: true
    })
/// turned booking[0] into a JSON OBJ so that i could add a property to it
    const Bookings = booking[0].toJSON()
    Bookings.Spot.previewImage = imgUrl[0].url

        res.json({Bookings})
    }
)















module.exports = router
