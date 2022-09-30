const express = require("express");
const jobseekerRouter = express.Router();
const {
  signup,
  login,
  protectRoute,
  logout,
} = require("../controllers/authController");
const {
  getJobseekerById,
  updateJobseekerById,
  deleteJobseekerById,
} = require("../controllers/jobseekerController");
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

jobseekerRouter //Basic Profile CRUD Routes
  .route("/:id")
  .get(protectRoute, getJobseekerById)
  .patch(protectRoute, updateJobseekerById)
  .delete(protectRoute, deleteJobseekerById);

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

jobseekerRouter //Job Apply Routes
  .route("/jobs")
  .get(allJobs);

jobseekerRouter
  .route("/:id/apply/:jobid")
  .post(protectRoute, applyForJob)
  .delete(protectRoute, deleteJobApplication);

jobseekerRouter
.route("/:id/response")
.get(protectRoute, allJobResponse);

jobseekerRouter
  .route("/:id/response/:jobid")
  .get(protectRoute, jobResponseById);

module.exports = jobseekerRouter;
