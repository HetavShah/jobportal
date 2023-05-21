const express = require('express');
const { body } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const Recruiter = require('../models/recruiter');
const Company = require('../models/company');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
router.post(
  '/api/recruiter/signup',
  [
    body('recruiter_details.email')
      .isEmail()
      .notEmpty()
      .withMessage('Please enter valid email address'),
    body('recruiter_details.password')
      .notEmpty()
      .isLength({
        min: 4,
        max: 20,
      })
      .withMessage('Please Enter password between 4 and 10 characters long'),
    body('recruiter_details.first_name')
      .trim()
      .notEmpty()
      .isAlpha()
      .withMessage('first name must contain only alphanumeric characters'),
    body('recruiter_details.last_name')
      .notEmpty()
      .isAlpha()
      .withMessage('last name must contain only alphanumeric characters'),
    body('recruiter_details.middle_name')
      .notEmpty()
      .isAlpha()
      .withMessage('middle name must contain only alphanumeric characters'),
    body('recruiter_details.gender')
      .notEmpty()
      .custom((gender) => {
        const Gender = ['M', 'F', 'O'];
        return Gender.includes(gender);
      })
      .withMessage('Gender must be one of the following : M , F , O'),
    body('recruiter_details.contact')
      .notEmpty()
      .isMobilePhone()
      .withMessage('Must be valid phone number'),
    body('recruiter_details.alternate_contact')
      .optional()
      .isMobilePhone()
      .withMessage('Must be valid phone number'),
    body('company_details.company_name')
      .notEmpty()
      .isAscii()
      .withMessage('company name must contain only alphanumeric characters'),
    body('company_details.descrip')
      .notEmpty()
      .isAscii()
      .withMessage('description must contain only alphanumeric characters'),
    body('company_details.url')
      .notEmpty()
      .isURL()
      .withMessage('url must be valid'),
  ],
  validateRequest,
  async (req, res) => {
    const recruiter_data = ({
      first_name,
      middle_name,
      last_name,
      gender,
      contact,
      alternate_contact,
      email,
      password,
      dob,
    } = req.body.recruiter_details);
    const company_data = ({ company_name, descrip, url } =
      req.body.company_details);

    recruiter_data['reg_date'] = new Date().toISOString();
    let recruiter = await Recruiter.findOne({
      where: {
        email: recruiter_data.email,
      },
    });

    if (recruiter) throw new BadRequestError('User Already Exists');

    let company = await Company.findOrCreate({
      where: {
        company_name: company_data.company_name,
      },
      defaults: {
        company_name: company_data.company_name,
        url: company_data.url,
        descrip: company_data.descrip,
      },
    });

    let newUser = await Recruiter.create(recruiter_data);
    await newUser.setCompany(company[0]);

    let jwToken = jwt.sign(
      {
        email: newUser.email,
        isRecruiter: true,
        id: newUser.id,
      },
      JWT_KEY
    ); //  create token with payload as email,id and other important fields
    res.cookie('login', jwToken, { httpOnly: true }); // set cookie

    return res.status(201).json(newUser);
  }
);

module.exports = {
  signupRouter: router,
};
