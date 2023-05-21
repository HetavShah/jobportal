const express = require('express');
const { param } = require('express-validator');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');
const Experience = require('../models/experience');
const requireAuth = require('../../../common/src/middlewares/require-auth');
router.get(
  '/api/jobseeker/:id/experience',requireAuth,
[
   param("id").isUUID().withMessage("Please Provide valid Jobseeker id"),
],validateRequest,
  async (req, res) => {
    let experience = await Experience.findAll({
      where: {
        jobseeker_id: req.params.id,
      },
    });
    if (!experience.length) throw new NotFoundError('Experience Details not found');

    return res.status(200).json(experience);
  }
);

module.exports = {
  getExperienceRouter: router,
};
