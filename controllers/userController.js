const JobseekerModel = require("../models/jobseekerModel");
const RecruiterModel = require("../models/recruiterModel");
module.exports.getUserById = async function getUserById(req, res) {
  try {
    let id = req.params.id;
    let data;
    if (req.baseUrl == "/jobseeker") {
      data = await JobseekerModel.findOne({
        attributes: { exclude: ["reg_date", "jobseeker_id"] },
        where: {
          jobseeker_id: id,
        },
      });
    } else if ((req.baseUrl = "/recruiter")) {
      data = await RecruiterModel.findOne({
        attributes: { exclude: ["reg_date", "recruiter_id"] },
        where: {
          recruiter_id: id,
        },
      });
    }

    if (data) {
      return res.json({
        message: "Data Retrieved Successfully",
        data: data,
      });
    } else {
      res.json({
        message: "User Doesn't Exists",
      });
    }
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};

module.exports.updateUserById = async function updateUserById(req, res) {
  let id = req.params.id;
  let dataTobeUpdated = req.body;
  try {
    let user;

    if (req.baseUrl == "/jobseeker") {
      user = await JobseekerModel.findOne({
        where: {
          jobseeker_id: id,
        },
      });
    } else if ((req.baseUrl = "/recruiter")) {
      user = await RecruiterModel.findOne({
        where: {
          recruiter_id: id,
        },
      });
    }

    if (user) {
      if (!Object.keys(dataTobeUpdated).length) {
        return res.json({
          message: "Provide Updation Data",
        });
      }

      let keys = [];
      for (let key in dataTobeUpdated) {
        keys.push(key);
      }
      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataTobeUpdated[keys[i]];
      }

      let updatedData = await user.save();

      return res.json({
        message: "Data Updated SuccessFully",
        data: updatedData,
      });
    } else {
      return res.status(404).json({
        message: "User Doesn't Exists",
      });
    }
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};

module.exports.deleteUserById = async function deleteUserById(req, res) {
  let id = req.params.id;
  try {
    let user;
    if (req.baseUrl == "/jobseeker") {
      user = await JobseekerModel.findOne({
        where: {
          jobseeker_id: id,
        },
      });
    } else if (req.baseUrl == "/recruiter") {
      user = await RecruiterModel.findOne({
        where: {
          recruiter_id: id,
        },
      });
    }

    if (user) {
      if (req.baseUrl == "/jobseeker") {
        await JobseekerModel.destroy({
          where: {
            jobseeker_id: id,
          },
        });
      } else if (req.baseUrl == "/recruiter") {
        await RecruiterModel.destroy({
          where: {
            recruiter_id: id,
          },
        });
      }

      return res.json({
        message: "Data Deleted Sucessfully",
      });
    } else {
      return res.status(404).json({
        message: "User Doesn't Exist",
      });
    }
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
