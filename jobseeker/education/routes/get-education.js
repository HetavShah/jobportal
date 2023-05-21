const express = require('express');
const { param } = require('express-validator');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');
const Education = require('../models/education');
router.get(
  '/api/jobseeker/:id/education',
[
   param("id").isUUID().withMessage("Please Provide valid Jobseeker id"),
],validateRequest,
  async (req, res) => {
    let education = await Education.findAll({
      where: {
        jobseeker_id: req.params.id,
      },
    });
    if (!education.length) throw new NotFoundError('Education Details not found');

    return res.status(200).json(education);
  }
);

module.exports = {
  getEducationRouter: router,
};
