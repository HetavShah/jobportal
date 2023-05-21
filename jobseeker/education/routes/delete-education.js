const express = require('express');
const { param } = require('express-validator');
const validateRequest = require('../../../common/src/middlewares/request-validation');
const router = express.Router();
const NotFoundError = require('../../../common/src/errors/not-found-error');
const Education = require('../models/education');
router.delete(
  '/api/jobseeker/:id/education/:eduid',
[
   param("id").isUUID().withMessage("Please Provide valid Jobseeker id"),
   param("eduid").isUUID().withMessage("Please Provide valid Education id"),
],validateRequest,
  async (req, res) => {
    let education = await Education.findOne({
      where: {
        jobseeker_id: req.params.id,
        edu_id:req.params.eduid
      },
    });
    if (!education) throw new NotFoundError('Education Details not found');

      await education.destroy();

    return res.status(200).json({message:"Data deleted successfully"});
  }
);

module.exports = {
  deleteEducationRouter: router,
};
