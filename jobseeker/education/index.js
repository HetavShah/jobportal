const express=require('express');
const {createEducationRouter}=require('./routes/create-education');
const {updateEducationRouter}=require('./routes/update-education');
const {getEducationRouter}=require('./routes/get-education');
const {deleteEducationRouter}=require('./routes/delete-education');

const router=express.Router();


router.use(createEducationRouter);
router.use(updateEducationRouter);
router.use(getEducationRouter);
router.use(deleteEducationRouter);

module.exports={
  educationRouter:router
}