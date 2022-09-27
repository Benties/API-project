const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth')
const { User, Spot, Review, SpotImage, sequelize } = require('../../db/models')

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { urlencoded } = require('express');
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
            where: {spotId: spot.id, preview: true},
            attributes: ['url'],
            raw: true
        })
            spot.avgRating = (Number(avg[0].average))
            pic[0] ? spot.previewImage = pic[0].url : spot.previewImage = null
        }
        res.json(
            resBody
        )
    }
)


module.exports = router
