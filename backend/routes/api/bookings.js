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


/// EDIT A BOOKING
router.put(
    '/:bookingId',
    requireAuth,
    async (req, res, next) => {
        const { startDate, endDate } = req.body
        const timeNow = new Date().getTime()
        const booking = await Booking.findByPk(req.params.bookingId)

        if(new Date(startDate).getTime() >= new Date(endDate).getTime()){
            res.statusCode = 400
            return res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "endDate": "endDate cannot come before startDate"
                }
              })
            }


        if(!booking){
            res.statusCode = 404
            return res.json({
                "message": "Booking couldn't be found",
                "statusCode": 404
              })
        }


        if(timeNow > new Date(booking.endDate).getTime()){
            res.statusCode = 403
            res.json({
                "message": "Past bookings can't be modified",
                "statusCode": 403
              })
        }


        const dates = await Booking.findAll({
            attributes: ['startDate', 'endDate'],
            raw: true
        })
        for(const date of dates){
            if(new Date(startDate).getTime() >= new Date(date.startDate).getTime() &&
               new Date(startDate).getTime() <= new Date(date.endDate).getTime()){
                res.statusCode = 403
                return res.json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": 403,
                    "errors": {
                      "startDate": "Start date conflicts with an existing booking"
                    }
                  })
                }

            if(new Date(endDate).getTime() >= new Date(date.startDate).getTime() &&
               new Date(endDate).getTime() <= new Date(date.endDate).getTime()){
             res.statusCode = 403
             return res.json({
                 "message": "Sorry, this spot is already booked for the specified dates",
                 "statusCode": 403,
                 "errors": {
                    "endDate": "End date conflicts with an existing booking"
                   }
               })
            }
        }


        if(booking.userId === req.user.id){
            const resBody = await booking.update({
                startDate,
                endDate
            })
            res.json(resBody)
        }
    }
)


/// GET ALL BOOKINGS FOR CURRENT USER
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
    for(book of booking){
        const imgUrl = await SpotImage.findAll({
            where: {spotId: book.Spot.id},
            attributes: ['url'],
            raw: true
        })

        book.Spot.dataValues.previewImage = imgUrl[0].url
    }

        res.json({Bookings: booking})
    }
)















module.exports = router
