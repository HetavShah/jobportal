const EducationModel = require("../models/educationModel");
const JobseekerModel = require("../models/jobseekerModel");
const ExperienceModel=require('../models/experienceModel');
module.exports.getProfileDetails = async function getProfileDetails(
  req,
  res
) {
  let id = req.params.id;
let urlRoute=req.url.split('/')[2];
  try {
    let user;
    if(urlRoute==='education')
    {
        user = await EducationModel.findAll({
            attributes:{
                exclude:["jobseeker_id","edu_id"]
            },
            where: {
            jobseeker_id: id,
          },
        });
    }
    else if(urlRoute==='experience'){
        user = await ExperienceModel.findAll({
            attributes:{
                exclude:["jobseeker_id","exp_id"]
            },
            where: {
            jobseeker_id: id,
          },
        });
    }
    if (user) {
      return res.json({
        Details:user
      });
    }
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
module.exports.createProfileDetails = async function createProfileDetails(
  req,
  res
) {
  try {
    let data = req.body; // Expecting array of objects where each object represents valid education or experience details
    let createdData = [];
    let urlRoute=req.url.split('/')[2];
    let id = req.params.id;
    let user = await JobseekerModel.findOne({
        where:{
            jobseeker_id:id
        }
    });

    if (user && data) {
     
        for (let key in data) {
            data[key]["jobseeker_id"]=id;

            if(urlRoute==='education'){
                let record = await EducationModel.create(data[key]);
                createdData.push(record);
            }else if(urlRoute=='experience')
            {
                let record = await ExperienceModel.create(data[key]);
                createdData.push(record);
            }
        }
        
        return res.status(200).json({
          message: "Details Created Successfully",
          data: createdData,
        });
    }
    else {
        return res.status(422).json({
          message: "Invalid Details",
        });
      }
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
module.exports.updateProfileDetails = async function updateProfileDetails(
  req,
  res
) {
  let id = req.params.id;
  let dataToBeUpdated = req.body;
  let urlRoute=req.url.split('/')[2];
  let rowUpdated;
  try {

    if(urlRoute=='education')
    {
        let edu_id = req.params.eduid;
        [rowUpdated]= await EducationModel.update(dataToBeUpdated, {
            where: {
            edu_id: edu_id,
            jobseeker_id: id,
            },
        });
    }
    else if(urlRoute=='experience'){
    let exp_id = req.params.expid;
    [rowUpdated]=await ExperienceModel.update(dataToBeUpdated,{
        where:{
            exp_id:exp_id,
            jobseeker_id:id
        }
    })
}
    if(rowUpdated)
    { 
        return res.json({
          message: "data Updated Successfully",
          
        });
    }else{
        return res.status(404).json({
            message:"Data Not Available"
        })
    }

  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
module.exports.deleteProfileDetails = async function deleteProfileDetails(
  req,
  res
) {
  let id = req.params.id;
  let urlRoute=req.url.split('/')[2];
  let rowDeleted=0;
  try {

      if(urlRoute=='education')
      {
        let edu_id = req.params.eduid;
        rowDeleted= await EducationModel.destroy({
          where: {
            edu_id: edu_id,
            jobseeker_id: id,
          },
        });
      }
      if(urlRoute=='experience'){
        let exp_id = req.params.expid;
        rowDeleted= await ExperienceModel.destroy({
          where: {
            exp_id: exp_id,
            jobseeker_id: id,
          },
        });
      }

    if(rowDeleted){
        return res.json({
          message: "Data Deleted Successfully",
        });
    }else{
        return res.status(404).json({
            message:"Data Not Available"
        })
    }
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};
