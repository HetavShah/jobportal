const express = require('express');
const { body,param } = require('express-validator');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');
const Education = require('../models/education');
router.patch(
  '/api/jobseeker/:id/education/:eduid',
  [
    param("id").isUUID().withMessage("Please Provide valid Jobseeker id"),
    param("eduid").isUUID().withMessage("Please Provide valid Education id"),
    body()
      .notEmpty()
      .custom((value) => {
        if (!Object.keys(value).length) return false;
        return true;
      })
      .withMessage('Please Provide atleast one field to update'),
    body('university_name')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('university_name Must not be empty')
      .isAlpha('en-US', { ignore: [' ', ',', '-'] })
      .withMessage('university_name must be a valid name'),
    body('start_year')
      .optional()
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
    body('end_year')
      .optional()
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
    body('*')
      .custom((value) => {
        if (value.start_year >= value.end_year) return false;
        return true;
      })
      .withMessage('start_year must be less then  end_year'),
    body('major_course')
      .optional()
      .trim()
      .notEmpty()
      .isAlpha('en-US', { ignore: [' ', ','] })
      .withMessage('major_course must be a valid course'),
    body('degree')
      .optional()
      .trim()
      .notEmpty()
      .isAlpha('en-US', { ignore: [' ', '-'] })
      .withMessage('degree must be a valid degree'),
  ],
  validateRequest,
  async (req, res) => {
    const data = req.body;
    let education = await Education.findOne({
      where: {
        jobseeker_id: req.params.id,
        edu_id: req.params.eduid,
      },
    });
    if (!education) throw new NotFoundError('Record not found');
    education.set(data);
    await education.save();
    return res.status(200).json(education);
  }
);

module.exports = {
  updateEducationRouter: router,
};
