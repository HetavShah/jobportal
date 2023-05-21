const express=require('express');
const { createJobseekerSkillRouter } = require('./routes/add-jobseeker-skills');
const { getJobseekerSkillRouter } = require('./routes/get-jobseeker-skills');
const { updateJobseekerSkillRouter } = require('./routes/update-jobseeker-skills');
const { deleteJobseekerSkillRouter } = require('./routes/delete-jobseeker-skills');

const router=express.Router();

router.use(createJobseekerSkillRouter);
router.use(getJobseekerSkillRouter);
router.use(updateJobseekerSkillRouter);
router.use(deleteJobseekerSkillRouter);

module.exports ={
  jobseekerSkillsRouter:router

} 
