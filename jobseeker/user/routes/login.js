const express = require('express');
const { body } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const  Jobseeker  = require('../models/jobseeker');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const router = express.Router();

router.post(
  '/api/jobseeker/login',
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
  ],
  validateRequest,
  async (req, res)=> {
    const data= {
      email,
      password,
    } = req.body;
    let jobseeker= await Jobseeker.findOne({
      where: {
        email: data.email
      },
    });

    if(!jobseeker) throw new BadRequestError("Invalid Credentials");
    const match = await bcrypt.compare(data.password, jobseeker.password);

    if(!match) throw new BadRequestError("Invalid Credentials");

    let jwToken = jwt.sign({ 
      email: jobseeker.email,
      isRecruiter:false,
      id: jobseeker.id
    }, JWT_KEY); //  create token with payload as email,id and other important fields
    res.cookie("login", jwToken, { httpOnly: true }); // set cookie

    return res.status(201).json(jobseeker);


  }
);

module.exports = {
  loginRouter: router,
};
