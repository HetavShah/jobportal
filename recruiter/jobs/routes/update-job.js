const express = require('express');
const { body } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const Job = require('../models/job');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const JobLocation = require('../models/location');
const JobType = require('../models/type');
const Skill = require('../../../skills/models/skill');
const NotFoundError = require('../../../common/src/errors/not-found-error');
const requireAuth = require('../../../common/src/middlewares/require-auth');

router.patch(
  '/api/recruiter/:id/jobs/:jobid',requireAuth,
  [
    body('location')
      .if(body('location').exists())
      .isObject()
      .withMessage('location must be an object')
      .bail(),

    body('location.city')
      .isAlpha('en-US', { ignore: [' ', "'"] })
      .notEmpty()
      .withMessage('Please enter valid city'),
    body('location.state')
      .isAlpha('en-US', { ignore: [' ', "'"] })
      .notEmpty()
      .withMessage('Please enter valid state'),
    body('type')
      .if(body('location').exists())
      .isObject()
      .withMessage('type must be an object')
      .bail(),
    body('type.job_type')
      .trim()
      .isAscii()
      .withMessage('Job type must contain only Ascii characters'),
    body('skills')
      .if(body('skills').exists())
      .isArray()
      .withMessage('Skills must be an array of objects')
      .bail(),
    body('skills.*.skill_name')
      .notEmpty()
      .isAscii()
      .withMessage('skill name must contain only alphanumeric characters'),
    body('job.descrip')
      .optional()
      .isAscii()
      .withMessage('job description must contain only alphanumeric characters'),
    body('job.post_date')
      .optional()
      .trim()
      .custom((date) => {
        let currentDate = Date.now();
        let post_date = new Date(date);
        if (currentDate > post_date) return true;
        else return false;
      })
      .withMessage('Must be a valid past date'),
    body('job.expiry_date')
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

    const job = await Job.findOne({
      where: {
        recruiter_id: req.params.id,
        job_id: req.params.jobid,
      },
    });
    if (!job) throw new NotFoundError('Job not found');

    if (job_data) {
      job.set(job_data);
      await job.save();
    }

    if (location_data) {
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
      await job.setJobLocation(location[0]);
    }
    if (job_type_data) {
      const type = await JobType.findOrCreate({
        where: {
          job_type: job_type_data.job_type,
        },
        defaults: {
          job_type: job_type_data.job_type,
        },
      });
      await job.setJobType(type[0]);
    }

    let skills = [];

    if (skills_data.length > 0) {
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
      await job.setSkills(skills);
    }

    return res.status(200).send(job);
  }
);

module.exports = {
  updateJobRouter: router,
};
