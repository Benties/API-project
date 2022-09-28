const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { User, Spot, Review, SpotImage, sequelize, ReviewImage, Booking } = require('../../db/models')

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { urlencoded } = require('express');

router.delete(
    '/:bookingId',
    requireAuth,
    async (req, res, next) => {
        const booking = await Booking.findByPk(req.params.bookingId,{
            include: [
                {
                    model: Spot,
                    attributes: ['ownerId']
                }
            ]
        })
        // console.log(booking)
        if(booking){
            if(booking.userId === req.user.id || booking.Spot.ownerId === req.user.id){
            }
            await booking.destroy()
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
              })

        } else {
            res.statusCode = 404
            res.json({
                "message": "Booking couldn't be found",
                "statusCode": 404
              })
        }
    }
)

router.put(
    '/:bookingId',
    requireAuth,
    async (req, res, next) => {
        const booking = await Booking.findByPk(req.params.bookingId)
        const { startDate, endDate } = req.body
        if(booking && booking.userId === req.user.id){
            const resBody = await booking.update({
                startDate,
                endDate
            })
            res.json(resBody)
        } else {
            res.statusCode = 404
            res.json({
                "message": "Booking couldn't be found",
                "statusCode": 404
              })
        }
    }
)


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
