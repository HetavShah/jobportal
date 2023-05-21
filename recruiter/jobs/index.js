const express=require('express');
const { createJobRouter } = require('./routes/create-job');
const { updateJobRouter } = require('./routes/update-job');
const { getJobRouter } = require('./routes/get-job');
const { deleteJobRouter } = require('./routes/delete-job');
const { getAppliedCandidatesRouter } = require('./routes/get-applied-candidates');
const router=express.Router();


router.use(createJobRouter);
router.use(updateJobRouter);
router.use(getJobRouter);
router.use(deleteJobRouter);
router.use(getAppliedCandidatesRouter);
module.exports={
  jobRouter:router
}