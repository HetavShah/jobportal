const express=require('express');
const { createJobRouter } = require('./routes/create-job');
const router=express.Router();


router.use(createJobRouter);

module.exports={
  jobRouter:router
}