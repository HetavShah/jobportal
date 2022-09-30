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
        await jobseekerModel.sync({force:true});
        await educationModel.sync({force:true});
        await experienceModel.sync({force:true});
        await companyModel.sync({force:true});
        await recruiterModel.sync({force:true});
        await skillsetModel.sync({force:true});
        await jobseekerSkillModel.sync({force:true});
        await jobTypeModel.sync({force:true});
        await jobLocationModel.sync({force:true});
        await jobModel.sync({force:true});
        await applyModel.sync({force:true});
        await responseModel.sync({force:true});
        await jobReqSkillModel.sync({force:true});
    }catch(error){
        console.log(error.message);
    }
   

};