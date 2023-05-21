const express = require('express');
const Jobseeker = require('../../user/models/jobseeker');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');

router.get(
  '/api/jobseeker/:id/skills',
  async (req, res) => {
    const data = req.body.skills;
    let jobseeker = await Jobseeker.findOne({
      where: {
        jobseeker_id: req.params.id,
      },
    });

    if (!jobseeker) throw new NotFoundError('Jobseeker not found');


    const result=await jobseeker.getSkills({
      joinTableAttributes: ['skill_level']
    });
    return res.status(201).json(result);
  }
);

module.exports = {
  getJobseekerSkillRouter: router,
};
