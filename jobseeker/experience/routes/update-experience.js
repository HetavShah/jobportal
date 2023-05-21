const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const NotFoundError = require('../../../common/src/errors/not-found-error');
const Experience = require('../models/experience');
const requireAuth = require('../../../common/src/middlewares/require-auth');
const router = express.Router();
router.patch(
  '/api/jobseeker/:id/experience/:expid',requireAuth,
  [
    param('id').isUUID().withMessage('Please Provide valid Jobseeker id'),
    param('expid').isUUID().withMessage('Please Provide valid Experience id'),
    body()
      .notEmpty()
      .custom((value) => {
        if (!Object.keys(value).length) return false;
        return true;
      })
      .withMessage('Please Provide atleast one field to update'),
    body('c_name')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('company name Must not be empty')
      .isAlpha('en-US', {ignore: [' ',',','-','.',"\'"]})
      .withMessage('company must be a valid name'),
    body('descrip')
      .optional()
      .isAscii()
      .withMessage('description must be valid'),
    body('start_date')
      .optional()
      .trim()
      .custom((date) => {
        let currentDate = Date.now();
        let start_date = new Date(date);
        if (currentDate > start_date) return true;
        else return false;
      })
      .withMessage('Must be a valid past date'),
    body('end_date')
      .optional()
      .trim()
      .custom((date) => {
        let currentDate = Date.now();
        let end_date = new Date(date);
        if (currentDate >= end_date) return true;
        else return false;
      })
      .withMessage('Must be a valid  date'),
    body()
      .custom((value) => {
        if (new Date(value.start_date) > new Date(value.end_date)) return false;
        return true;
      })
      .withMessage('start_date must be less then  end_date'),
    body('job_title')
      .optional()
      .trim()
      .notEmpty()
      .isAscii()
      .withMessage('Job title must be valid'),
  ],
  validateRequest,
  async (req, res) => {
    const data = req.body;
    let experience = await Experience.findOne({
      where: {
        jobseeker_id: req.params.id,
        exp_id: req.params.expid,
      },
    });
    if (!experience) throw new NotFoundError('Record not found');
    experience.set(data);
    await experience.save();
    return res.status(200).json(experience);
  }
);

module.exports = {
  updateExperienceRouter: router,
};
