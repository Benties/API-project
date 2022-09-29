const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { User, Spot, Review, SpotImage, sequelize, ReviewImage, Booking } = require('../../db/models')

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { urlencoded } = require('express');

const validateSpot = [
          check('address')
            .exists({ checkFalsy: true })
            .withMessage('Street address is required'),
          check('city')
            .exists({ checkFalsy: true })
            .withMessage('City is required'),
          check('state')
            .exists({ checkFalsy: true })
            .withMessage('State is required'),
          check('country')
            .exists({ checkFalsy: true })
            .withMessage('Country is required'),
          check('lat')
            .isDecimal()
            .withMessage('Latitude is not valid'),
          check('lng')
            .isDecimal()
            .withMessage('Longitude is not valid'),
          check('name')
            .isLength({ max: 50 })
            .withMessage('Name must be less than 50 characters'),
          check('description')
            .exists({ checkFalsy: true })
            .withMessage('Description is required'),
          check('price')
            .exists({ checkFalsy: true })
            .isDecimal()
            .withMessage('Price per day is required'),
    handleValidationErrors
]

const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
      .isInt({ min: 1, max: 5})
      .withMessage('Stars must be an integer from 1 to 5'),

    handleValidationErrors
]



router.delete(
    '/:spotId',
    requireAuth,
    async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId)
        if(spot && spot.ownerId === req.user.id){
            await spot.destroy()
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
              })
        } else {
            res.statusCode = 404
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
              })
        }
    }
)

/// EDIT A SPOT
router.put(
    '/:spotId',
    requireAuth,
    validateSpot,
    async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId)
        if(spot && spot.ownerId === req.user.id){
            const { address, city, state, country, lat, lng, name, description, price } = req.body
            const resBody = await spot.update({
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            })
            res.json(resBody)
        } else {
            res.statusCode = 404
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
              })
        }
    }
)


/// CREATE A BOOKING BASED ON SPOT ID
router.post(
    '/:spotId/bookings',
    requireAuth,
    async (req, res, next) => {
        let { startDate, endDate } = req.body
        const spot = await Spot.findByPk(req.params.spotId)

        if(new Date(startDate).getTime() >= new Date(endDate).getTime()){
            res.statusCode = 400
            return res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                  "endDate": "endDate cannot be on or before startDate"
                }
              })
            }

        if(spot){
            res.statusCode = 404
            return res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
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

        if(spot.ownerId !== req.user.id){
            const resBody = await Booking.create({
                spotId: spot.id,
                userId: req.user.id,
                startDate,
                endDate
            })
            res.json(resBody)
        }
    }
)

/// CREATE REVIEW FOR A SPOT
router.post(
    '/:spotId/reviews',
    requireAuth,
    validateReview,
    async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId)
        let { review, stars } = req.body
        if(spot){
            stars = parseInt(stars)
            const resBody = await Review.create({
                userId: req.user.id,
                spotId: spot.id,
                review,
                stars
            })
            res.json(resBody)
        } else {
            res.statusCode = 404
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
              })
        }
    }
)


router.post(
    '/:spotId/images',
    requireAuth,
    async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId)
        if(spot && spot.ownerId === req.user.id){
            const { url, preview } = req.body
            const spotImg = await SpotImage.create({
                spotId: spot.id,
                url,
                preview
            })
            const resBody = await SpotImage.findByPk(spotImg.id)
            res.json(resBody)
        } else {
            res.statusCode = 404
            res.json({message: "Couldn't find a Spot with the specified id",
                      statusCode: 404})
        }
    }
)

router.post(
    '/',
    validateSpot,
    requireAuth,
    async (req, res, next) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const newSpot = await Spot.create({
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
        res.json(newSpot)
    }
)



router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {
        let resBody = {}

        resBody.Spots = await Spot.findAll({
            where: {ownerId: req.user.id},
            raw: true
        })


        for (const spot of resBody.Spots) {
            const avg = await Review.findAll({
              where: { spotId: spot.id },
              attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'average']],
              raw: true
                })
            const pic = await SpotImage.findAll({
                where: {spotId: spot.id},
                attributes: ['url', 'preview'],
                raw: true
            })
                spot.avgRating = (Number(avg[0].average))
                for(const pics of pic){
                    console.log(pics)
                    pics.preview ? spot.previewImage = pics.url : spot.previewImage = null
                }
            }
            res.json(
                resBody
            )

    }
)


/// GET ALL BOOKINGS BASED ON SPOT ID
router.get(
    '/:spotId/bookings',
    requireAuth,
    async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId)
        if(spot){
            spot.ownerId === req.user.id ? x = [null, { model: User }] : x = ['customer', null]
            const booking = await Booking.scope(x[0]).findAll({
                where: {spotId: spot.id},
                include:  x[1]
            })
            res.json({Bookings: booking})
        } else {
            res.statusCode = 404
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
              })
        }
    }
)


///GET REVIEWS BY SPOT ID
router.get(
    '/:spotId/reviews',
    async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId)
        if(spot){
            const resBody = await Review.findAll({
                where: {spotId: spot.id},
                include: [
                    { model: User, attributes: ['id', 'firstName', 'lastName'] },
                    { model: ReviewImage, attributes: ['id', 'url'] }
                ]
            })
            res.json({Reviews: resBody})
        } else {
            res.statusCode = 404
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
              })
        }
    }
)


router.get(
    '/:spotId',
    async (req, res, next) => {


        const spot = await Spot.findByPk(req.params.spotId, {
            include: [{model: SpotImage}, {model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName']}]
        })
        if(spot){
            const data = await Review.findAll({
                where: { spotId: spot.id },
                attributes: [
                    [sequelize.fn('AVG', sequelize.col('stars')), 'average'],
                    [sequelize.fn('COUNT', sequelize.col('id')), 'count']
                ],
                raw: true
            })

            const resBody = spot.toJSON()
            resBody.numReviews = data[0].count
            resBody.avgStarRating = data[0].average
            await User.findByPk(spot.ownerId)
            res.json(resBody)
        } else {
            res.statusCode = 404
            res.json({
                message: "Spot couldn't be found",
                statusCode: 404
              })
        }
    }
)

router.get(
    '/',
    async (req, res, next) => {
        let resBody = { }

       resBody.Spots = await Spot.findAll({
        raw: true
       })

       for (const spot of resBody.Spots) {
        const avg = await Review.findAll({
          where: { spotId: spot.id },
          attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'average']],
          raw: true
            })
        const pic = await SpotImage.findAll({
            where: {spotId: spot.id},
            attributes: ['url', 'preview'],
            raw: true
        })
            spot.avgRating = (Number(avg[0].average))
            for(const pics of pic){
                console.log(pics)
                pics.preview ? spot.previewImage = pics.url : spot.previewImage = null
            }
        }
        res.json(
            resBody
        )
    }
)


module.exports = {
    router,
    validateReview
}
