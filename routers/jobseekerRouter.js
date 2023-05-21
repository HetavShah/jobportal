const express = require("express");
const jobseekerRouter = express.Router();
const {signupRouter}=require('../jobseeker/user/routes/signup');
const {
  signup,
  login,
  protectRoute,
  logout,
} = require("../controllers/authController");
const {
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");
const {
  getProfileDetails,
  createProfileDetails,
  updateProfileDetails,
  deleteProfileDetails,
} = require("../controllers/profileController");
const {
  getSkills,
  addSkills,
  updateSkills,
  deleteSkills,
} = require("../controllers/skillsController");
const {
  allJobs,
  applyForJob,
  deleteJobApplication,
  allJobResponse,
  jobResponseById,
} = require("../controllers/jobController");


jobseekerRouter //Auth Routes
  .route("/signup")
  .post(signup);

jobseekerRouter
.route("/login").
post(login);

jobseekerRouter
.route("/logout")
.get(logout);

jobseekerRouter 
  .route("/job")
  .get(allJobs);


jobseekerRouter.use(protectRoute);
jobseekerRouter //Basic Profile CRUD Routes
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

jobseekerRouter
.route("/:id/education") //Education Details CRUD Routes
.get(getProfileDetails)
.post(createProfileDetails)

jobseekerRouter
  .route("/:id/education/:eduid")
  .patch(updateProfileDetails)
  .delete(deleteProfileDetails)

jobseekerRouter //Experience Details CRUD Routes
.route("/:id/experience")
.get(getProfileDetails)
.post(createProfileDetails)

jobseekerRouter 
  .route("/:id/experience/:expid")
  .patch(  updateProfileDetails)
  .delete(  deleteProfileDetails);

jobseekerRouter //Skill Details CRUD Routes
  .route("/:id/skills")
  .get(getSkills)
  .post(addSkills)
  .patch(updateSkills)
  .delete(deleteSkills);


jobseekerRouter
  .route("/:id/apply/:jobid")   //Job Apply Routes
  .post(applyForJob)
  .delete(deleteJobApplication);

jobseekerRouter
.route("/:id/response")
.get(allJobResponse);

jobseekerRouter
  .route("/:id/response/:jobid")
  .get(jobResponseById);



module.exports = jobseekerRouter;
