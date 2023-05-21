const express = require('express');
const { param } = require('express-validator');
const NotFoundError = require('../../../common/src/errors/not-found-error');
const Jobseeker = require('../models/jobseeker');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();

router.get(
  '/api/jobseeker/:id',
  [param('id').notEmpty().isUUID().withMessage('Please enter valid id')],
  validateRequest,
  async (req, res) => {
    const id = req.params.id;

    let jobseeker = await Jobseeker.findOne({
      where: {
        jobseeker_id: id,
      },
    });

    if (!jobseeker) throw new NotFoundError('Jobseeker not found');

    return res.status(200).json(jobseeker);
  }
);

module.exports = {
  getJobseekerRouter: router,
};
