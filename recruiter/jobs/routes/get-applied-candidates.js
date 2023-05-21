const express = require('express');
const { body } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const Job = require('../models/job');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');
const Jobseeker=require('../../../jobseeker/user/models/jobseeker');
const Education=require('../../../jobseeker/education/models/education');
const Response = require('../models/response');
const Experience = require('../../../jobseeker/experience/models/experience');
const JobseekerSkill = require('../../../jobseeker/skills/models/jobseeker-skill');
const Skill = require('../../../skills/models/skill');
const requireAuth = require('../../../common/src/middlewares/require-auth');

router.get('/api/recruiter/:id/jobs/:jobid/response',requireAuth, async (req, res) => {
  const candidates = await Response.findAll({
    where: {
      recruiter_id: req.params.id,
      job_id: req.params.jobid,
    },
    attributes: {
      exclude: ['recruiter_id','jobseeker_id'],
    },
    include:[
      {
        model: Jobseeker,
        include: [
          {
            model:Education,
            attributes:{
              exclude:['edu_id','jobseeker_id']
            }
          },
          {
            model:Experience,
            attributes:{
              exclude:['exp_id','jobseeker_id']
            }
          },
          {
            model:Skill,
            attributes:{
              exclude:['skill_id'],
            },
            through:{
              attributes:{
                exclude:['skill_id','jobseeker_id']
              }
            }
          },
        ],
        attributes:{
          exclude:['email','password','dob','reg_date']
        }
      }
    ]
  });
  if (!candidates.length) throw new NotFoundError('No Applications found');

  return res.status(200).send(candidates);
});

module.exports = {
  getAppliedCandidatesRouter: router,
};
