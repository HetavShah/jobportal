const express = require("express");
const jobseekerRouter = express.Router();
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

jobseekerRouter //Basic Profile CRUD Routes
  .route("/:id")
  .get(protectRoute, getUserById)
  .patch(protectRoute, updateUserById)
  .delete(protectRoute, deleteUserById);

jobseekerRouter
.route("/:id/education") //Education Details CRUD Routes
.get(protectRoute, getProfileDetails)
.post(protectRoute, createProfileDetails)

jobseekerRouter
  .route("/:id/education/:eduid")
  .patch(protectRoute, updateProfileDetails)
  .delete(protectRoute, deleteProfileDetails)

jobseekerRouter //Experience Details CRUD Routes
.route("/:id/experience")
.get(protectRoute, getProfileDetails)
.post(protectRoute, createProfileDetails)

jobseekerRouter 
  .route("/:id/experience/:expid")
  .patch(protectRoute, updateProfileDetails)
  .delete(protectRoute, deleteProfileDetails);

jobseekerRouter //Skill Details CRUD Routes
  .route("/:id/skills")
  .get(protectRoute, getSkills)
  .post(protectRoute, addSkills)
  .patch(protectRoute, updateSkills)
  .delete(protectRoute, deleteSkills);


jobseekerRouter
  .route("/:id/apply/:jobid")   //Job Apply Routes
  .post(protectRoute, applyForJob)
  .delete(protectRoute, deleteJobApplication);

jobseekerRouter
.route("/:id/response")
.get(protectRoute, allJobResponse);

jobseekerRouter
  .route("/:id/response/:jobid")
  .get(protectRoute, jobResponseById);

module.exports = jobseekerRouter;
