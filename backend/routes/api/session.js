const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('credential')
    .isLength({ max: 100 })
    .withMessage('Credentials must be less than 100 characters'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  check('password')
  .exists({ checkFalsy: true })
  .isLength({ max: 150 })
  .withMessage('Password must less than 150 characters.'),

  handleValidationErrors
];

router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      user.dataValues.token = await setTokenCookie(res, user);

      return res.json(
        user.dataValues
      );
    }
  );

  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json(
           user.toSafeObject()
        );
      } else return res.json(null);
    }
  );





module.exports = router;
