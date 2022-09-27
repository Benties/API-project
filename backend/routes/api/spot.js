const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { User, Spot, Review, SpotImage, sequelize } = require('../../db/models')

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { urlencoded } = require('express');


router.post(
    '/:spotId/images',
    requireAuth,
    async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId)
        const { url, preview } = req.body
        if(spot && spot.ownerId === req.user.id){
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
            include: [SpotImage]
        })

        const avg = await Review.findAll({
            where: { spotId: spot.id },
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'average']],
            raw: true
        })

        // const pics = await SpotImage.findAll({
        //     where: {}
        // })
        const resBody = spot.toJSON()
        resBody.avgStarRating = avg[0].average
        console.log(avg)
        res.json(resBody)
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
