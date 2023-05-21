const express=require('express');
const { signupRouter } = require('./routes/signup');
const { loginRouter } = require('./routes/login');
const {logoutRouter}=require("./routes/logout");
const {updateJobseekerRouter}=require('./routes/update-jobseeker');
const {getJobseekerRouter}=require('./routes/get-jobseeker');
const router=express.Router();
router.use(signupRouter);
router.use(loginRouter);
router.use(logoutRouter);
router.use(updateJobseekerRouter);
router.use(getJobseekerRouter);

module.exports={
  userRouter:router
}