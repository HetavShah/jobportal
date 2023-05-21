const express = require('express');
const { param } = require('express-validator');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');
const Experience = require('../models/experience');
router.delete(
  '/api/jobseeker/:id/experience/:expid',
[
   param("id").isUUID().withMessage("Please Provide valid Jobseeker id"),
   param("expid").isUUID().withMessage("Please Provide valid Experience id"),
],validateRequest,
  async (req, res) => {
    let experience = await Experience.findOne({
      where: {
        jobseeker_id: req.params.id,
        exp_id:req.params.expid
      },
    });
    if (!experience) throw new NotFoundError('Experience Details not found');

      await experience.destroy();

    return res.status(200).json({message:"Data deleted successfully"});
  }
);

module.exports = {
  deleteExperienceRouter: router,
};
