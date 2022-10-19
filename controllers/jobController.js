const JobModel = require("../models/jobModel");
const RecruiterModel = require("../models/recruiterModel");
const JobseekerModel = require("../models/jobseekerModel");
const ApplyModel = require("../models/applyModel");
const JobReqModel = require("../models/jobReqSkillModel");
const LocationModel = require("../models/jobLocationModel");
const TypeModel = require("../models/jobTypeModel");
const Response = require("../models/responseModel");
const companyModel=require('../models/companyModel');
const EducationModel=require('../models/educationModel');
const ExperienceModel=require('../models/experienceModel');
const JobseekerSkillModel=require('../models/jobseekerSkilllModel');
const Skillset = require("../models/skillsetModel");
/* ------------------------ JOBSEEKER JOB CONTROLLER ------------------------------ */

module.exports.allJobs = async function allJobs(req, res) {
  try {
    let data = await JobModel.findAll(
      {
        include:[
          {
            model:LocationModel,
            attributes:['street_name','city','state','pincode']
          },
          {
            model:TypeModel,
            attributes:['job_type']
          },
          {
            model:RecruiterModel,
            include:[{
              model:companyModel,
              attributes:{
                exclude:['company_id']
              }
            }],
            attributes:{
              exclude:['recruiter_id','reg_date','email','password','company_id']
            }
          },
          {
            model:Skillset,
            through:{
              attributes:[]
            }
          }
      ],
      attributes:{
        exclude:['location_id','type_id','recruiter_id']
      }
        
      }
    );

    return res.json({
      message: "Job Details",
      data: data,
    });
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};

module.exports.applyForJob = async function applyForJob(req, res) {
  let jobId = req.params.jobid;
  let userId = req.params.id;
  let data = req.body;
  try {
    let Job = JobModel.findOne({
      where: {
        job_id: jobId,
      },
    });

    if (Job) {
      data["job_id"] = jobId;
      data["jobseeker_id"] = userId;
      let jobApplication = await ApplyModel.create(data);
      if (jobApplication) {
        return res.json({
          message: "Successfully Applied",
        });
      }
    } else {
      return res.status(404).json({
        message: "Job Doesn't Exists",
      });
    }
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
module.exports.deleteJobApplication = async function deleteJobApplication(
  req,
  res
) {
  let userId = req.params.id;
  let jobId = req.params.jobid;
  try {
    let job = JobModel.findOne({
      where: {
        job_id: jobId,
      },
    });

    if (job) {
      let deletedData = await ApplyModel.destroy({
        where: {
          jobseeker_id: userId,
          job_id: jobId,
        },
      });

      if (deletedData) {
        return res.json({
          message: "Data Deleted Successfully",
        });
      } else {
        return res.status(404).json({
          message: "Data Not Available",
        });
      }
    } else {
      return res.status(404).json({
        message: "Job Doesn't Exists",
      });
    }
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
module.exports.allJobResponse = async function allJobResponse(req, res) {
  let userId = req.params.id;
  try {
    let ResponseData = await Response.findAll({
      where: {
        jobseeker_id: userId,
      },
    });

    return res.json({
      message: "Data Retrived",
      data: ResponseData,
    });
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
module.exports.jobResponseById = async function jobResponseById(req, res) {
  let JobId = req.params.jobid;
  let userId = req.params.id;
  try {
    let response = await Response.findOne({
      where: {
        jobseeker_id:userId,
        job_id:JobId
      },
    });

    if(response){

        return res.json({
            message: "Job Response Details",
            data: response,
          });

    }else{
        return res.status(404).json({
            message:"Response Not Found"
        })
    }

  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};

/* ------------------------ RECRUITER JOB CONTROLLER ------------------------------ */

module.exports.jobPostedByRecId = async function jobPostedByRecId(req, res) {
  try {
    let id = req.params.id;

    if (req.user == "recruiter") {
      let jobs = await JobModel.findAll({
        include:[
          {
          model:LocationModel,
          attributes:{
            exclude:['location_id']
          }
        },
        {
          model:TypeModel,
          attributes:{
            exclude:['type_id']
          }
        },
        {
          model:Skillset,
          through:{
            attributes:[]
          },
          attributes:{
            exclude:['skillset_id']
          }
        }],
        where: {
          recruiter_id: id,
        },
        exclude:['location_id','type_id','skillset_id']
      });

      return res.json({
        data: jobs,
      });
    }
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
module.exports.createJob = async function createJob(req, res) {
  let locationInfo = req.body["location"];
  let jobTypeInfo = req.body["type"];
  let jobDetails = req.body["job"];
  let skillDetails=req.body["skills"];
  let JobReqSkills;

  try {
    let Location = await LocationModel.create(locationInfo);
    let Type = await TypeModel.create(jobTypeInfo);
    jobDetails["location_id"] = Location["location_id"];
    jobDetails["type_id"] = Type["type_id"];
    jobDetails["recruiter_id"]=req.params.id;
    let Job =await  JobModel.create(jobDetails);

//------------------------JOBREQSKILL TABLE FILL -------------------------
    skillDetails.forEach(async element=>{

      JobReqSkills=await Skillset.findOne({
        where:{
          skill_name:element["skill_name"]
        }
      });
      if(!JobReqSkills)
      {
        JobReqSkills=await Skillset.create(element);
      }
      let data={};
      data["job_id"]=Job["job_id"];
      data["skillset_id"]=JobReqSkills["skillset_id"];
      // console.log(data);
      await JobReqModel.create(data);
    })
//------------------------------------------------------------------------

    return res.json({
      message: "Job Created Successfully",
      details: Job,
    });
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
module.exports.updateJobDetails = async function updateJobDetails(req, res) {
  let jobId = req.params.jobid;
  let locationUpdate = req.body["location"];
  let typeUpdate = req.body["type"];
  let jobUpdate = req.body["job"];
  let updatedLocation, updatedType, updatedJob;

  try {
    let job = JobModel.findOne({
      where: {
        job_id: jobId,
      },
    });

    if (job) {
      if (locationUpdate) {
        updatedLocation = await LocationModel.update(locationUpdate, {
          where: {
            location_id: job["location_id"],
          },
        });
      }
      if (typeUpdate) {
        updatedType = await TypeModel.update(typeUpdate, {
          where: {
            type_id: job["type_id"],
          },
        });
      }
      if (jobUpdate) {
        updatedJob = await JobModel.update(jobUpdate, {
          where: {
            job_id: jobId,
          },
        });
      }

      let finalData = await JobModel.findOne({
        include: [LocationModel, TypeModel],
        where: {
          job_id: jobId,
        },
      });

      return res.json({
        updatedData: finalData,
      });
    } else {
      return res.status(404).json({
        message: "Job Doesn't Exist",
      });
    }
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
module.exports.deleteJobById = async function deleteJobById(req, res) {
  try {
    let id = req.params.jobid;
    let deletedData = await JobModel.destroy({
      where: {
        job_id: id,
      },
    });
    return res.json({
      message: "data Deleted SuccessFully",
    });
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
module.exports.getAllCandidateDetails = async function getAllCandidateDetails(
  req,
  res
) {
  try {
    let candidateDetails = await Response.findAll({
      attributes: ["jobseeker_id"],
      where: {
        recruiter_id: req.params.id,
        job_id: req.params.jobid,
      },
    });
    let data = [];
    for (let i in candidateDetails) {
      let jobseeker_detail = await JobseekerModel.findOne({
        include:[{
          model:EducationModel,
          attributes:{
            exclude:['jobseeker_id','edu_id']
          }
        },{
         model: ExperienceModel,
         attributes:{
          exclude:['jobseeker_id','exp_id']
         }
        },{
          model:Skillset,
         through:{
          attributes:['skill_level']
         },
         attributes:{
          exclude:['skillset_id']
         }

        }],
        where: {
          jobseeker_id: candidateDetails[i]["jobseeker_id"],
        },
        attributes:{
          exclude:['email','password','dob','reg_date']
        }
      });
      data.push(jobseeker_detail);
    }

    return res.json({
      message: "Jobseeker Details",
      data: data,
    });
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
module.exports.candidateSelection = async function candidateSelection(
  req,
  res
) {
  try {
    let selectionValue = {
      is_selected: req.body["is_selected"],
    };
    let id = req.params.id;
    let jobId = req.params.jobid;
    let jsId=req.params.jsid;
    let [updatedData] = await Response.update(selectionValue, {
      where: {
        recruiter_id: id,
        job_id: jobId,
        jobseeker_id:jsId
      },
    });
    if (updatedData) {
      return res.json({
        message: "Data Updated Successfully",
      });
    } else {
      return res.status(404).json({
        message: "Data Doesn't Exists",
      });
    }
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
