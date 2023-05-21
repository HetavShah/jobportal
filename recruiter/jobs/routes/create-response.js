const express = require('express');
const { body, param } = require('express-validator');
const BadRequestError = require('../../../common/src/errors/bad-request-error');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const Response=require('../models/response');
const NotFoundError = require('../../../common/src/errors/not-found-error');
const requireAuth = require('../../../common/src/middlewares/require-auth');
router.post(
  '/api/recruiter/:id/jobs/:jobid/response/:jsid',requireAuth,
  [
    param("id").isUUID().withMessage("id must be valid"),
    body("is_selected").isBoolean().withMessage("is_selected must be a boolean value")
  ],
  validateRequest,
  async (req, res) => {
    const selection=req.body.is_selected;
   const record=await Response.findOne({
    where:{
      recruiter_id:req.params.id,
      jobseeker_id:req.params.jsid,
      job_id:req.params.jobid
    }
   })
   if(!record) throw new NotFoundError('Record not found');
   record.set({
    is_selected:selection
   });
   await record.save();
   return res.json(record);
  }
);

module.exports = {
  createJobRouter: router,
};
