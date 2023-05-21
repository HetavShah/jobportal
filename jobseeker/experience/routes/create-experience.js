const express = require('express');
const { body } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const Jobseeker = require('../../user/models/jobseeker');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');
const Experience=require('../models/experience');
router.post(
  '/api/jobseeker/:id/experience',
  [
    body('experience').isArray().withMessage('Must be an array'),
    body('experience.*')
      .isObject()
      .withMessage('Array elements must be objects'),
    body('experience.*.c_name')
      .trim()
      .notEmpty()
      .withMessage('company name must not be empty')
      .isAlpha('en-US', {ignore: [' ',',','-','.',"\'"]})
      .withMessage('company name must be a valid name'),
    body('experience.*.descrip')
      .optional()
      .isAscii()
      .withMessage('description must be valid'),
      body('experience.*.start_date')
      .trim()
      .custom((date) => {
        let currentDate = Date.now();
        let start_date = new Date(date);
        if (currentDate > start_date) return true;
        else return false;
      })
      .withMessage('Must be a valid past date'),
      body('experience.*.start_date')
      .trim()
      .custom((date) => {
        let currentDate = Date.now();
        let start_date = new Date(date);
        if (currentDate > start_date) return true;
        else return false;
      })
      .withMessage('Must be a valid past date'),
      body('experience.*.end_date')
      .trim()
      .custom((date) => {
        let currentDate = Date.now();
        let end_date = new Date(date);
        if (currentDate >= end_date) return true;
        else return false;
      })
      .withMessage('Must be a valid  date'),
    body('experience.*')
      .custom((value) => {
        if (new Date(value.start_date) > new Date(value.end_date)) return false;
        return true;
      })
      .withMessage('start_date must be less then  end_date'),
    body('experience.*.job_title')
      .trim()
      .notEmpty()
      .isAscii()
      .withMessage('Job title must be valid'),
  ],
  validateRequest,
  async (req, res) => {
    const data=req.body.experience;
    let jobseeker = await Jobseeker.findOne({
      where: {
        jobseeker_id: req.params.id,
      },
    });

    if (!jobseeker) throw new NotFoundError('Jobseeker not found');
    const details=[]
     for(value of data)
     {
          // console.log(value);
          const experience=await Experience.create(value);
          await experience.setJobseeker(jobseeker);
          details.push(experience);
     }

    return res.status(201).json(details);
  }
);

module.exports = {
  createExperienceRouter: router,
};
