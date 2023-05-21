const express = require('express');
const { body } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const Jobseeker = require('../../user/models/jobseeker');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');
const JobseekerSkill = require('../models/jobseeker-skill');
const Skill = require('../../../skills/models/skill');
const requireAuth = require('../../../common/src/middlewares/require-auth');
router.post(
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
    const result=[];
    for (value of data) {
      let skill=await Skill.findOrCreate({
        where: {
          skill_name: value.skill_name,
        },
      });

      // console.log(value);

      const j_skill=await jobseeker.addSkill(skill[0],{through:{
        skill_level:value.skill_level
      }});
      j_skill.push({"skill_name":skill[0]["skill_name"]});
      result.push(j_skill);
    }
  return res.json(result);
  }

);

module.exports = {
  createJobseekerSkillRouter: router,
};
