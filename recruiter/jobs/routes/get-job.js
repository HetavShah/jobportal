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
const Recruiter = require('../../user/models/recruiter');
const Company = require('../../user/models/company');
const requireAuth = require('../../../common/src/middlewares/require-auth');

router.get('/api/recruiter/:id/jobs/:jobid',requireAuth, async (req, res) => {
  const job = await Job.findOne({
    where: {
      recruiter_id: req.params.id,
      job_id: req.params.jobid,
    },
    attributes: {
      exclude: ['recruiter_id', 'location_id', 'type_id'],
    },
    include: [
      {
        model: JobLocation,
        attributes: {
          exclude: ['location_id'],
        },
      },
      {
        model: JobType,
        attributes: {
          exclude: ['type_id'],
        },
      },
      {
        model: Recruiter,
        attributes: {
          exclude: [
            'email',
            'password',
            'reg_date',
            'contact',
            'alternate_contact',
            'company_id',
            'recruiter_id',
          ],
        },
        include: [
          {
            model: Company,
            attributes: {
              exclude: ['company_id'],
            },
          },
        ],
      },
      {
        model: Skill,
        attributes: {
          exclude: ['skill_id'],
        },
        through: {
          attributes: [],
        },
      },
    ],
  });
  if (!job) throw new NotFoundError('Job not found');

  return res.status(200).send(job);
});

module.exports = {
  getJobRouter: router,
};
