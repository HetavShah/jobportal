const express=require('express');
const recruiterRouter=express.Router();
const {signup,login,protectRoute,logout}=require('../controllers/authController')
const {getRecruiterById}=require('../controllers/recruiterController');

recruiterRouter
.route('/signup')
.post(signup);

recruiterRouter
.route('/login')
.post(login);

recruiterRouter
// .route('/:id')
// .get(protectRoute,getRecruiterById)
// .patch(protectRoute,updateRecruiterById)
// .delete(protectRoute,deleteRecruiterById);

// recruiterRouter
// .route('/:id/job')
// .get(protectRoute,jobPostedByRecId)         // Details of all the jobs posted By Recruiter 
// .post(protectRoute,createJob);

// recruiterRouter
// .route('/:id/job/:jobid')
// .patch(protectRoute,updateJobDetails)
// .delete(protectRoute,deleteJobById)

// recruiterRouter
// .route('/:id/job/:jobid/response')
// .get(protectRoute,getAllCandidateDetails)
// .post(protectRoute,candidateSelection)
// .patch(protectRoute,updateSelection)



recruiterRouter
.route('/logout')
.get(logout);

module.exports=recruiterRouter;