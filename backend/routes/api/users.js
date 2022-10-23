const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('email')
      .isLength({ max: 100 })
      .withMessage('Email must be less than 100 characters'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .isLength({ max: 100 })
      .withMessage('Username must be less than 100 characters'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6, max: 150 })
      .withMessage('Password must be 6 and less than 150 characters.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('First name field is required'),
    check('firstName')
      .isLength({ max: 100 })
      .withMessage('First name must be less than 100 characters'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Last name field is required'),
    check('lastName')
      .isLength({ max: 100 })
      .withMessage('Last name must be less than 100 characters'),
    handleValidationErrors
  ];

router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      const user = await User.signup({ email, username, password, firstName, lastName });

      user.dataValues.token = await setTokenCookie(res, user);

      return res.json(
        user.dataValues
      );
    }
  );




module.exports = router;
