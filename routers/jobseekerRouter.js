const express=require('express');
const jobseekerRouter=express.Router();
const {signup,login,protectRoute,logout}=require('../controllers/authController')
const {getJobseekerById}=require('../controllers/jobseekerController');

jobseekerRouter
.route('/signup')
.post(signup);

jobseekerRouter
.route('/login')
.post(login);

jobseekerRouter
.route('/:id')
.get(protectRoute,getJobseekerById);

jobseekerRouter
.route('/logout')
.get(logout);


module.exports=jobseekerRouter;