const express = require('express');
const { param } = require('express-validator');
const NotFoundError = require('../../../common/src/errors/not-found-error');
const Recruiter = require('../models/recruiter');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const requireAuth = require('../../../common/src/middlewares/require-auth');
const router = express.Router();

router.get(
  '/api/recruiter/:id',requireAuth,
  [param('id').notEmpty().isUUID().withMessage('Please enter valid id')],
  validateRequest,
  async (req, res) => {
    const id = req.params.id;

    let recruiter = await Recruiter.findOne({
      where: {
        recruiter_id: id,
      },
    });

    if (!recruiter) throw new NotFoundError('Recruiter not found');

    return res.status(200).json(recruiter);
  }
);

module.exports = {
  getRecruiterRouter: router,
};
