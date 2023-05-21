const express=require('express');
const {createExperienceRouter}=require('./routes/create-experience');
const {updateExperienceRouter}=require('./routes/update-experience');
const {getExperienceRouter}=require('./routes/get-experience');
const {deleteExperienceRouter}=require('./routes/delete-experience');
const requireAuth = require('../../common/src/middlewares/require-auth');

const router=express.Router();


router.use(createExperienceRouter);
router.use(updateExperienceRouter);
router.use(getExperienceRouter);
router.use(deleteExperienceRouter);

module.exports={
  experienceRouter:router
}