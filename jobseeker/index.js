const express=require('express');
const { userRouter } = require('./user');
const { educationRouter } = require('./education');
const { experienceRouter } = require('./experience');
const { jobseekerSkillsRouter } = require('./skills');
const { jobRouter } = require('./jobs');
const router=express.Router();

router.use(userRouter);
router.use(educationRouter);
router.use(experienceRouter);
router.use(jobseekerSkillsRouter);
router.use(jobRouter);

module.exports={
  jobseekerRouter:router
}
