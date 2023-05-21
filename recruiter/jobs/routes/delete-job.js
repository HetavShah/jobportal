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

router.delete('/api/recruiter/:id/jobs/:jobid',requireAuth, async (req, res) => {
  const job = await Job.findOne({
    where: {
      recruiter_id: req.params.id,
      job_id: req.params.jobid,
    },
  });
  if (!job) throw new NotFoundError('Job not found');

  await job.destroy();

  return res.status(200).send({
    message: 'Job deleted successfully',
  });
});

module.exports = {
  deleteJobRouter: router,
};
