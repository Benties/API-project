const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { User, Spot, Review, SpotImage, sequelize, ReviewImage } = require('../../db/models')
const { validateReview } = require('./spot.js')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { urlencoded } = require('express');


router.delete(
    '/:reviewId',
    requireAuth,
    async (req, res, next) => {
        const review = await Review.findByPk(req.params.reviewId)
        if(review && review.userId === req.user.id){
            await review.destroy()
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
              })
        } else {
            res.statusCode = 404
            res.json({
                "message": "Review couldn't be found",
                "statusCode": 404
              })
        }
    }
  )

/// EDIT REVIEW
router.put(
    '/:reviewId',
    requireAuth,
    validateReview,
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

// CREATE IMAGE FOR REVIEW
router.post(
    '/:reviewId/images',
    requireAuth,
    async (req, res, next) => {
        const count = await ReviewImage.count({
            where: { reviewId: req.params.reviewId }
        })
        if(count >= 10){
            res.statusCode = 403
            return res.json({
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403
              })
        }
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



// GET REVIEWS OF CURRENT USER
router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {
        const reviews = await Review.findAll({
            where: { userId: req.user.id },
            include: [
                { model: User, attributes: ['id', 'firstName', 'lastName'] },
                { model: Spot ,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt']
                  }
                },
                { model: ReviewImage, attributes: ['id', 'url'] }
            ],
            // raw: true
        })
        // console.log(resBody[1].dataValues.id)
        for(const spot of reviews){
            const prevImg = await SpotImage.findOne({
                where: { spotId: spot.Spot.id },
                attributes: ['url', 'spotId', 'id'],
                raw: true
            })
            // console.log(prevImg)
            // console.log(spot.Spot.dataValues)
            spot.Spot.dataValues.previewImage = prevImg.url
        }
        // const resBody = review.toJSON()
        // console.log(resBody[0].dataValues)
        res.json({Reviews: reviews})
    }
  )















module.exports = router
