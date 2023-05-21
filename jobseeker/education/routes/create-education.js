const express = require('express');
const { body } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const Jobseeker = require('../../user/models/jobseeker');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');
const Education=require('../models/education');
router.post(
  '/api/jobseeker/:id/education',
  [
    body('education').isArray().withMessage('Must be an array'),
    body('education.*')
      .isObject()
      .withMessage('Array elements must be objects'),
    body('education.*.university_name')
      .trim()
      .notEmpty()
      .withMessage('university_name Must not be empty')
      .isAlpha('en-US', {ignore: [' ',',','-']})
      .withMessage('university_name must be a valid name'),
    body('education.*.start_year')
      .trim()
      .isInt()
      .isLength({
        min: 4,
        max: 4,
      })
      .toInt()
      .custom((value) => {
        const currentYear = new Date().getFullYear();
        if (value > currentYear && value < 1900) return false;
        return true;
      })
      .withMessage('start_year must be a valid year'),
    body('education.*.end_year')
      .trim()
      .isInt()
      .isLength({
        min: 4,
        max: 4,
      })
      .toInt()
      .custom((value) => {
        const currentYear = new Date().getFullYear();
        if (value > currentYear && value < 1900) return false;
        return true;
      })
      .withMessage('end_year must be a valid year'),
    body('education.*')
      .custom((value) => {
        if (value.start_year >= value.end_year) return false;
        return true;
      })
      .withMessage('start_year must be less then  end_year'),
    body('education.*.major_course')
      .trim()
      .notEmpty()
      .isAlpha('en-US', {ignore: [' ',',']})
      .withMessage('major_course must be a valid course'),
    body('education.*.degree')
      .trim()
      .notEmpty()
      .isAlpha('en-US', {ignore: [' ','-']})
      .withMessage('degree must be a valid degree'),
  ],
  validateRequest,
  async (req, res) => {
    const data=req.body.education;
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
          const education=await Education.create(value);
          await education.setJobseeker(jobseeker);
          details.push(education);
     }

    return res.status(201).json(details);
  }
);

module.exports = {
  createEducationRouter: router,
};
