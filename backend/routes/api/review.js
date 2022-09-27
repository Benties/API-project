const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { User, Spot, Review, SpotImage, sequelize, ReviewImage } = require('../../db/models')

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { urlencoded } = require('express');

router.put(
    '/:reviewId',
    requireAuth,
    async (req, res, next) => {
        const { review, stars } = req.body
        const target = await Review.findByPk(req.params.reviewId)
        if(target && target.userId === req.user.id){
            const resBody = await target.update({
                review,
                stars
            })
            res.json(resBody)
        } else {
            res.statusCode = 404
            res.json({
                "message": "Review couldn't be found",
                "statusCode": 404
              })
        }
    }
)


router.post(
    '/:reviewId/images',
    requireAuth,
    async (req, res, next) => {
        const { url } = req.body
        const review = await Review.findByPk(req.params.reviewId)
        if(review && review.userId === req.user.id){
            const resBody = await ReviewImage.create({
                reviewId: review.id,
                url
            })
            res.json({id: resBody.id, url: resBody.url})
        } else {
            res.statusCode = 404
            res.json({
                "message": "Review couldn't be found",
                "statusCode": 404
              })
        }
    }
)




router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {
        const resBody = await Review.findAll({
            where: { userId: req.user.id },
            include: [
                { model: User, attributes: ['id', 'firstName', 'lastName'] },
                { model: Spot },
                { model: ReviewImage, attributes: ['id', 'url'] }
            ]
        })
        res.json({Reviews: resBody})
    }
  )















module.exports = router
