const express = require('express');
const { body } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const  Jobseeker  = require('../models/jobseeker');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const jwt=require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
router.post(
  '/api/jobseeker/signup',
  [
    body('email')
      .trim()
      .isEmail()
      .notEmpty()
      .withMessage('Please enter valid email address'),
    body('password')
      .trim()
      .notEmpty()
      .isLength({
        min: 4,
        max: 20,
      })
      .withMessage('Please Enter password between 4 and 10 characters long'),
    body('first_name')
      .trim()
      .notEmpty()
      .isAlpha()
      .withMessage('first name must contain only alphanumeric characters'),
    body('last_name')
      .trim()
      .notEmpty()
      .isAlpha()
      .withMessage('last name must contain only alphanumeric characters'),
    body('middle_name')
      .trim()
      .notEmpty()
      .isAlpha()
      .withMessage('middle name must contain only alphanumeric characters'),
    body('gender')
      .trim()
      .notEmpty()
      .custom((gender) => {
        const Gender = ['M', 'F', 'O'];
        return Gender.includes(gender);
      })
      .withMessage('Gender must be one of the following : M , F , O'),
    body('contact')
      .trim()
      .notEmpty()
      .isMobilePhone()
      .withMessage('Must be valid phone number'),
    body('alternate_contact')
      .trim()
      .optional()
      .isMobilePhone()
      .withMessage('Must be valid phone number'),
    body('dob')
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
    data["reg_date"]=new Date().toISOString();
    let jobseeker= await Jobseeker.findOne({
      where: {
        email: data.email
      },
    });

    if(jobseeker) throw new BadRequestError("User Already Exists");
    
    let newUser= await Jobseeker.create(data);

        let jwToken = jwt.sign({ 
          email: newUser.email,
          isRecruiter:false,
          id: newUser.jobseeker_id,
          isAdmin:req.query.isAdmin
        }, JWT_KEY); //  create token with payload as email,id and other important fields
        res.cookie("login", jwToken, { httpOnly: true }); // set cookie

    return res.status(201).json(newUser);


  }
);

module.exports = {
  signupRouter: router,
};
