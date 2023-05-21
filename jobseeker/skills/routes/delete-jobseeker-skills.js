const express = require('express');
const Jobseeker = require('../../user/models/jobseeker');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');
const JobseekerSkill = require('../models/jobseeker-skill');
const requireAuth = require('../../../common/src/middlewares/require-auth');
router.delete('/api/jobseeker/:id/skills/:skillId',requireAuth, async (req, res) => {
  const data = req.body.skills;
  let jobseeker = await Jobseeker.findOne({
    where: {
      jobseeker_id: req.params.id,
    },
  });

  if (!jobseeker) throw new NotFoundError('Jobseeker not found');

  const j_skill = await JobseekerSkill.findOne({
    where: {
      jobseeker_id: req.params.id,
      skill_id: req.params.skillId,
    },
  });
if(!j_skill) throw new NotFoundError('Record not found');
  await j_skill.destroy();

  return res.status(201).json({
    message: 'Data Deleted Successfully',
  });
});

module.exports = {
  deleteJobseekerSkillRouter: router,
};
