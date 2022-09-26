const jobseekerModel = require("../models/jobseekerModel");
const recruiterModel = require("../models/recruiterModel");
const companyModel = require("../models/companyModel");

module.exports.signup = async function signup(req, res) {
  try {
    let data = req.body;

    if (req.baseUrl == "/jobseeker") {
      let createdData = await jobseekerModel.create(data);
      if (createdData) {
        return res.status(200).json({
          message: "Jobseeker Signed Up Successfully",
          data: createdData,
        });
      } else {
        return res.json({
          message: "Invalid Details",
        });
      }
    } 
    
    else if (req.baseUrl == "/recruiter") {

      let recruiterData = req.body["recruiter_details"];
      let companyData = req.body["company_details"];

      let isCompanyAvailable = await companyModel.findOne({
        attributes: ["company_id"],
        where: {
          company_name: companyData["company_name"],
        },
      });

      if (!isCompanyAvailable) {
        let createdData = await companyModel.create(companyData);
        recruiterData["company_id"] = createdData["company_id"];
      } 
      
      else {
        recruiterData["company_id"] = isCompanyAvailable["company_id"];
      }

      let recruiterCreatedData = await recruiterModel.create(recruiterData);
    
      if (recruiterCreatedData) {
        res.status(200).json({
          message: "Recruiter Signed Up",
          data: recruiterCreatedData,
        });
      }
      
      else {
        res.json({
          message: "Not Valid Data",
        });
      }
    }
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};

module.exports.login = function login(req, res) {
  if (req.baseUrl == "/jobseeker") {
    return res.json({
      message: "Jobseeker Login",
    });
  } else if (req.baseUrl == "/recruiter") {
    return res.json({
      message: "Recruiter Login",
    });
  }
};
