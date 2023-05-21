const express = require('express');
const { body } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const  Jobseeker  = require('../../user/models/jobseeker');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');
const Job = require('../../../recruiter/jobs/models/job');

router.post(
  '/api/jobseeker/:id/apply',
  [
    body('job_id')
      .trim()
      .isUUID()
      .notEmpty()
      .withMessage('Please enter valid id'),
  ],
  validateRequest,
  async (req, res)=> {
    const data= {
      job_id
    } = req.body;
    data["apply_date"]=new Date().toISOString();
    let jobseeker= await Jobseeker.findOne({
      where: {
        jobseeker_id: req.params.id
      },
    });

    if(!jobseeker) throw new NotFoundError("Job seeker not found");

    let job=await Job.findOne({
      where:{
        job_id:data.job_id,
      }
    });
    if(!job) throw new NotFoundError("Job not found");
    if(new Date(data.apply_date)>new Date(job.expiry_date)) throw new BadRequestError("Job is Expired");


   let result= await jobseeker.addJob(job,{
    through:{
      apply_date:data.apply_date,
      recruiter_id:job.recruiter_id,
    }
   });

    return res.status(201).json(result);


  }
);

module.exports = {
  createApplicationRouter: router,
};
