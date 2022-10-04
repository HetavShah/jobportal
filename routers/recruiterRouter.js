const express=require('express');
const recruiterRouter=express.Router();
const {signup,login,protectRoute,logout}=require('../controllers/authController')
const {jobPostedByRecId,createJob,updateJobDetails,deleteJobById,getAllCandidateDetails,candidateSelection}=require('../controllers/jobController');
const {
    getUserById,
    updateUserById,
    deleteUserById,
  } = require("../controllers/userController");
  
  recruiterRouter
  .route('/signup')
  .post(signup);
  
  recruiterRouter
  .route('/login')
  .post(login);
  
  recruiterRouter
  .route('/logout')
  .get(logout);
  
recruiterRouter
.route('/:id')
.get(protectRoute,getUserById)
.patch(protectRoute,updateUserById)
.delete(protectRoute,deleteUserById);

recruiterRouter
.route('/:id/job')
.get(protectRoute,jobPostedByRecId)         // Details of all the jobs posted By Recruiter 
.post(protectRoute,createJob);

recruiterRouter
.route('/:id/job/:jobid')
.patch(protectRoute,updateJobDetails)
.delete(protectRoute,deleteJobById)

recruiterRouter
.route('/:id/job/:jobid/response')
.get(protectRoute,getAllCandidateDetails)
.post(protectRoute,candidateSelection)
.patch(protectRoute,candidateSelection)



module.exports=recruiterRouter;