const express = require('express');
const {param } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const  Jobseeker  = require('../../user/models/jobseeker');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const jwt=require("jsonwebtoken");
const NotFoundError = require('../../../common/src/errors/not-found-error');
const Job = require('../../../recruiter/jobs/models/job');
const JWT_KEY = process.env.JWT_KEY;
const Response=require('../../../recruiter/jobs/models/response');
const requireAuth = require('../../../common/src/middlewares/require-auth');
router.delete(
  '/api/jobseeker/:id/apply/:jobid',requireAuth,
  [
    param('jobid')
      .trim()
      .isUUID()
      .notEmpty()
      .withMessage('Please enter valid job id'),
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
        job_id:req.params.jobid
      }
    });
    if(!job) throw new NotFoundError("Job not found");
    await jobseeker.removeJob(job);

    return res.status(201).json({
      message:"job application Deleted Successfully"
    });


  }
);

module.exports = {
  deleteApplicationRouter: router,
};
