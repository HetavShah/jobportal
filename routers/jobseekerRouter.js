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
  getEducationDetails,
  createEducationDetails,
  updateEducationDetails,
  deleteEducationDetails,
} = require("../controllers/educationController");
const {
  getExperienceDetails,
  createExperienceDetails,
  updateExperienceDetails,
  deleteExperienceDetails,
} = require("../controllers/experienceController");
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

jobseekerRouter.route("/login").post(login);

jobseekerRouter.route("/logout").get(logout);

jobseekerRouter //Basic Profile CRUD Routes
  .route("/:id")
  .get(protectRoute, getJobseekerById)
  .patch(protectRoute, updateJobseekerById)
  .delete(protectRoute, deleteJobseekerById);

jobseekerRouter //Education Details CRUD Routes
  .route("/:id/education")
  .get(protectRoute, getEducationDetails)
  .post(protectRoute, createEducationDetails)
  .patch(protectRoute, updateEducationDetails)
  .delete(protectRoute, deleteEducationDetails)

jobseekerRouter //Experience Details CRUD Routes
  .route("/:id/experience")
  .get(protectRoute, getExperienceDetails)
  .post(protectRoute, createExperienceDetails)
  .patch(protectRoute, updateExperienceDetails)
  .delete(protectRoute, deleteExperienceDetails);

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

jobseekerRouter.route("/:id/response").get(protectRoute, allJobResponse);

jobseekerRouter
  .route("/:id/response/:jobid")
  .get(protectRoute, jobResponseById);

module.exports = jobseekerRouter;
