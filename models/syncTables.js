const jobseekerModel = require("./jobseekerModel");
const recruiterModel= require("./recruiterModel");
const experienceModel = require("./experienceModel");
const educationModel = require("./educationModel");
const companyModel = require("./companyModel");
const skillsetModel = require("./skillsetModel");
const jobseekerSkillModel = require("./jobseekerSkilllModel");
const jobTypeModel = require("./jobTypeModel");
const jobLocationModel = require("./jobLocationModel");
const jobModel = require("./jobModel");
const jobReqSkillModel = require("./jobReqSkillModel");
const applyModel = require("./applyModel");
const responseModel = require("./responseModel");


module.exports.syncTables=async function syncTables(){
    try{
        await jobseekerModel.sync();
        await educationModel.sync();
        await experienceModel.sync();
        await companyModel.sync();
        await recruiterModel.sync();
        await skillsetModel.sync();
        await jobseekerSkillModel.sync();
        await jobTypeModel.sync();
        await jobLocationModel.sync();
        await jobModel.sync();
        await applyModel.sync();
        await responseModel.sync();
        await jobReqSkillModel.sync();
        console.log("All Tables Created Successfully");
    }catch(error){
        console.log(error.message);
    }
   

};