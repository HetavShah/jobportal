const express=require('express');
const recruiterRouter=express.Router();
const {signup,login}=require('../controllers/authController')
const {getRecruiterById}=require('../controllers/recruiterController');

recruiterRouter
.route('/signup')
.post(signup);

recruiterRouter
.route('/login')
.post(login);

recruiterRouter
.route('/:id')
.get(getRecruiterById);

module.exports=recruiterRouter;