const express=require('express');
const { createApplicationRouter } = require('./routes/create-application');
const { deleteApplicationRouter } = require('./routes/delete-application');

const router=express.Router();


router.use(createApplicationRouter);
router.use(deleteApplicationRouter);


module.exports={
  jobRouter:router
}