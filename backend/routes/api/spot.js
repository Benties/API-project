const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { User, Spot, Review, SpotImage, sequelize } = require('../../db/models')

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { urlencoded } = require('express');


router.put(
    '/:spotId',
    requireAuth,
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


router.post(
    '/:spotId/reviews',
    requireAuth,
    async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId)
        const { review, stars } = req.body
        if(spot && parseInt(stars)){
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


module.exports = router
