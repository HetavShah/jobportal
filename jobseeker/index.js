const express=require('express');
const { userRouter } = require('./user');
const { educationRouter } = require('./education');
const { experienceRouter } = require('./experience');
const { jobseekerSkillsRouter } = require('./skills');
const router=express.Router();

router.use(userRouter);
router.use(educationRouter);
router.use(experienceRouter);
router.use(jobseekerSkillsRouter);

module.exports={
  jobseekerRouter:router
}