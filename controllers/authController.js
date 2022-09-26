const jobseekerModel=require('../models/jobseekerModel');
const recruiterModel=require('../models/recruiterModel');


module.exports.signup=async function signup(req,res){

  let data=req.body;

  if(req.baseUrl=='/jobseeker'){
   let createdData=await jobseekerModel.create(data);
   if(createdData){
    return res.json({
      message:"Jobseeker Signed Up Successfully",
      data:createdData
    })
   }

  }
  else if (req.baseUrl=='/recruiter'){
    let createdData=await recruiterModel.create(data);
    if(createdData){
     return res.json({
       message:"Recruiter Signed Up Successfully",
       data:createdData
     })
  }

  
}


module.exports.login=function login(req,res){
  if(req.baseUrl=='/jobseeker'){

    return res.json({
       message:"Jobseeker Login"
     })
   }
   
   else if (req.baseUrl=='/recruiter'){
 
     return res.json({
       message:"Recruiter Login"
     })
   }

}
