const express = require('express');
const { body } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const Job = require('../models/job');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JobLocation = require('../models/location');
const JobType = require('../models/type');
const Skill = require('../../../skills/models/skill');
const Recruiter = require('../../user/models/recruiter');
const NotFoundError = require('../../../common/src/errors/not-found-error');
const JobReqSkill = require('../models/req-skill');
const requireAuth = require('../../../common/src/middlewares/require-auth');
const JWT_KEY = process.env.JWT_KEY;
router.post(
  '/api/recruiter/:id/jobs',requireAuth,
  [
    body('location.city')
      .isAlpha('en-US', { ignore: [' ', "'"] })
      .notEmpty()
      .withMessage('Please enter valid city'),
    body('location.state')
      .isAlpha('en-US', { ignore: [' ', "'"] })
      .notEmpty()
      .withMessage('Please enter valid state'),
    body('type.job_type')
      .trim()
      .isAscii()
      .withMessage('Job type must contain only Ascii characters'),
    body('skills').isArray().withMessage('Skills must be an array of objects'),
    body('skills.*.skill_name')
      .notEmpty()
      .isAscii()
      .withMessage('skill name must contain only alphanumeric characters'),
    body('job.descrip')
      .notEmpty()
      .isAscii()
      .withMessage('job description must contain only alphanumeric characters'),
    body('job.post_date')
      .trim()
      .notEmpty()
      .custom((date) => {
        let currentDate = Date.now();
        let post_date = new Date(date);
        if (currentDate > post_date) return true;
        else return false;
      })
      .withMessage('Must be a valid past date'),
    body('job.expiry_date')
      .notEmpty()
      .trim()
      .custom((date) => {
        let currentDate = Date.now();
        let expiry_date = new Date(date);
        if (currentDate < expiry_date) return true;
        else return false;
      })
      .withMessage('Must be a valid future date'),
  ],
  validateRequest,
  async (req, res) => {
    const location_data = ({ city, state } = req.body.location);
    const job_type_data = ({ job_type } = req.body.type);
    const skills_data = req.body.skills;
    const job_data = ({ descrip, post_date, expiry_date } = req.body.job);

    const recruiter = await Recruiter.findOne({
      where: {
        recruiter_id: req.params.id,
      },
    });
    if (!recruiter) throw new NotFoundError('Recruiter not found');
    const location = await JobLocation.findOrCreate({
      where: {
        city: location_data.city,
        state: location_data.state,
      },
      defaults: {
        city: location_data.city,
        state: location_data.state,
      },
    });
    const type = await JobType.findOrCreate({
      where: {
        job_type: job_type_data.job_type,
      },
      defaults: {
        job_type: job_type_data.job_type,
      },
    });

    let skills = [];

    for (value of skills_data) {
      let skill = await Skill.findOrCreate({
        where: {
          skill_name: value.skill_name,
        },
        defaults: {
          skill_name: value.skill_name,
        },
      });
      skills.push(skill[0]);
    }
    let job = await Job.create(job_data);
    await job.setJobLocation(location[0]);
    await job.setRecruiter(recruiter);
    await job.setJobType(type[0]);
    await job.setSkills(skills);

    return res.status(201).send(job);
  }
);

module.exports = {
  createJobRouter: router,
};
