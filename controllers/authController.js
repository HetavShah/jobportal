const jobseekerModel = require("../models/jobseekerModel");
const recruiterModel = require("../models/recruiterModel");
const companyModel = require("../models/companyModel");
const { JWT_KEY } = require("../secrets");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        return res.status(422).json({
          message: "Invalid Details",
        });
      }
    } else if (req.baseUrl == "/recruiter") {
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
      } else {
        recruiterData["company_id"] = isCompanyAvailable["company_id"];
      }

      let recruiterCreatedData = await recruiterModel.create(recruiterData);

      if (recruiterCreatedData) {
        res.status(200).json({
          message: "Recruiter Signed Up",
          data: recruiterCreatedData,
        });
      } else {
        res.status(422).json({
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

module.exports.login = async function login(req, res) {
  try {
    let givenEmail = req.body.email;
    let givenPassword = req.body.password;
    let id = undefined;
    let user = undefined;

    if (req.baseUrl == "/jobseeker") {
      user = await jobseekerModel.findOne({
        where: {
          email: givenEmail,
        },
      });
      if(user)
      id = user.jobseeker_id;
      userType = "jobseeker";
    } else if (req.baseUrl == "/recruiter") {
      user = await recruiterModel.findOne({
        where: {
          email: givenEmail,
        },
      });

      id = user.recruiter_id;
      userType = "recruiter";
    }

    if (user) {
      const match = await bcrypt.compare(givenPassword, user.password);
      if (match) {
        let jwToken = jwt.sign({ payload: id }, JWT_KEY); //  create token with payload as id
        res.cookie("login", jwToken, { httpOnly: true }); // set cookie
        return res.status(200).json({
          message: "User Logged In",
          details: user,
        });
      } else {
        return res.status(401).json({
          message: "Invalid Credentials",
        });
      }
    } else {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(422).json({
      message: error.message,
    });
  }
};

module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    if (req.cookies.login) {
      let token = req.cookies.login;
      let id = jwt.verify(token, JWT_KEY).payload; // if sucessfull verification then jwt.verify will return payload which contains over userId
      // console.log(id.payload);
      let user;
      if (req.baseUrl == "/jobseeker") {
        user = await jobseekerModel.findOne({
          where: {
            jobseeker_id: id,
          },
        });
        req["user"]='jobseeker'
      } else if (req.baseUrl == "/recruiter") {
        user = await recruiterModel.findOne({
          where: {
            recruiter_id: id,
          },
        });
        req["user"]='recruiter'
      }
      if (user && id==req.params.id) {
        next();
      } else {
        return res.status(401).json({
          message: "User Not Available or Unauthorized Access",
        });
      }
    } else {
      return res.status(401).json({
        message: "Please Login to View This Page",
      });
    }
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};

module.exports.logout = function logout(req, res) {
  res.cookie("login", " ", { maxAge: 1 });
  res.json({
    message: "User logged out succesfully",
  });
};
