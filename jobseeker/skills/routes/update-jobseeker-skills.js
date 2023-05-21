const express = require('express');
const { body,param } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const Jobseeker = require('../../user/models/jobseeker');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');
const JobseekerSkill = require('../models/jobseeker-skill');
const Skill = require('../../../skills/models/skill');
const requireAuth = require('../../../common/src/middlewares/require-auth');

router.patch(
  '/api/jobseeker/:id/skills',requireAuth,
  [
    body('skills').isArray().withMessage('Must be an array'),
    body('skills.*').isObject().withMessage('Array elements must be objects'),
    body('skills.*.skill_name')
      .trim()
      .notEmpty()
      .withMessage('skill name must not be empty')
      .isAlpha('en-US', { ignore: [' ', ',', '-', '.', "'"] })
      .withMessage('skill name must be a valid name'),
    body('skills.*.skill_level')
      .isInt()
      .custom((value)=>{
        if(value<=5 && value>0) return true;
        return false;
      })
      .withMessage('skill level must be a integer between 1 and 5'),
  ],
  validateRequest,
  async (req, res) => {
    const data = req.body.skills;
    let jobseeker = await Jobseeker.findOne({
      where: {
        jobseeker_id: req.params.id,
      },
    });

    if (!jobseeker) throw new NotFoundError('Jobseeker not found');
    const details = [];
    for (value of data) {
      
      let skill=await Skill.findOne({
        where: {
          skill_name: value.skill_name,
        },
      });
      if(!skill)
      {
         throw new NotFoundError('Skill not found');
      }
      console.log(value);
      const jobseeker_skills = await JobseekerSkill.findOne({
        where:{
          jobseeker_id: req.params.id,
        skill_id:skill.skill_id
        }
      });
      if(!jobseeker_skills) throw new NotFoundError('Record not found');
       jobseeker_skills.set({skill_level:value.skill_level});
       await jobseeker_skills.save();
      details.push(jobseeker_skills);
    }

    return res.status(201).json(details);
  }
);

module.exports = {
  updateJobseekerSkillRouter: router,
};
