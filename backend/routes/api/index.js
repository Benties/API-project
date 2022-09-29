const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { router: spotsRouter } = require('./spot.js');
const reviewsRouter = require('./review.js');
const bookingRouter = require('./bookings.js');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { Spot, Review, SpotImage, ReviewImage} = require('../../db/models')

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingRouter);



router.delete(
  '/spot-images/:imageId',
  requireAuth,
  async (req, res, next) => {
    const spotImg = await SpotImage.findByPk(req.params.imageId, {
      include: [
        {
          model: Spot,
          attributes: ['ownerId']
        }
      ]
    })
    if(spotImg && spotImg.Spot.ownerId === req.user.id){
      await spotImg.destroy()
      res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
    } else {
      res.statusCode = 404
      res.json({
        "message": "Spot Image couldn't be found",
        "statusCode": 404
      })
    }
  }
)

router.delete(
  '/review-images/:imageId',
  requireAuth,
  async (req, res, next) => {
    const revImg = await ReviewImage.findByPk(req.params.imageId, {
      include: [
        {
          model: Review,
          attributes: ['userId']
        }
      ]
    })
    if(revImg && revImg.Review.userId === req.user.id){
      await revImg.destroy()
      res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
    } else {
      res.statusCode = 404
      res.json({
        "message": "Review Image couldn't be found",
        "statusCode": 404
      }
      )
    }
  }
)


router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
