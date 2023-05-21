const express=require('express');
const { createApplicationRouter } = require('./routes/create-application');
const { deleteApplicationRouter } = require('./routes/delete-application');
const { getAllJobRouter } = require('./routes/get-all-jobs');

const router=express.Router();


router.use(createApplicationRouter);
router.use(deleteApplicationRouter);
router.use(getAllJobRouter);

module.exports={
  jobRouter:router
}