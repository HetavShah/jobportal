const express = require('express');
const { body,param } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const  Jobseeker  = require('../models/jobseeker');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');
router.patch(
  '/api/jobseeker/:id',
  [
    param("id").isUUID().withMessage("Please enter valid id"),
    body('email')
      .optional()
      .trim()
      .isEmail()
      .notEmpty()
      .withMessage('Please enter valid email address'),
    body('password')
      .optional()
      .trim()
      .notEmpty()
      .isLength({
        min: 4,
        max: 20,
      })
      .withMessage('Please Enter password between 4 and 10 characters long'),
    body('first_name')
      .optional()
      .trim()
      .notEmpty()
      .isAlpha()
      .withMessage('first name must contain only alphanumeric characters'),
    body('last_name')
    .optional()
      .trim()
      .notEmpty()
      .isAlpha()
      .withMessage('last name must contain only alphanumeric characters'),
    body('middle_name')
    .optional()
      .trim()
      .notEmpty()
      .isAlpha()
      .withMessage('middle name must contain only alphanumeric characters'),
    body('gender')
    .optional()
      .trim()
      .notEmpty()
      .custom((gender) => {
        const Gender = ['M', 'F', 'O'];
        return Gender.includes(gender);
      })
      .withMessage('Gender must be one of the following : M , F , O'),
    body('contact')
    .optional()
      .trim()
      .notEmpty()
      .isMobilePhone()
      .withMessage('Must be valid phone number'),
    body('alternate_contact')
    .optional()
      .trim()
      .isMobilePhone()
      .withMessage('Must be valid phone number'),
    body('dob')
    .optional()
      .trim()
      .custom((date) => {
        let currentDate = Date.now();
        let dob = new Date(date);
        if (currentDate > dob) return true;
        else return false;
      })
      .withMessage('Must be a valid past date'),
  ],
  validateRequest,
  async (req, res)=> {
    const data= {
      first_name,
      middle_name,
      last_name,
      gender,
      contact,
      alternate_contact,
      email,
      password,
      dob,
    } = req.body;
    if(!Object.keys(data).length) throw new BadRequestError("Please provide updation data");
    let jobseeker= await Jobseeker.findOne({
      where: {
        jobseeker_id: req.params.id
      },
    });

    if(!jobseeker) throw new NotFoundError("Jobseeker Doesn't Exists");
    jobseeker.set(data);
    await jobseeker.save();

    return res.status(200).send(jobseeker);
  }
);

module.exports = {
  updateJobseekerRouter: router,
};
