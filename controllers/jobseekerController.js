const JobseekerModel = require("../models/jobseekerModel");

module.exports.getJobseekerById=async function getJobseekerById(req,res){
        try{
            let id=req.params.id;
           const data= await JobseekerModel.findOne({
                 attributes: {exclude:['reg_date','jobseeker_id']},
                 where: {
                     jobseeker_id: id
                 }
             })

             if(data){
                return res.json({
                    message:"Data Retrieved Successfully",
                    data:data
                })
             }
             else{
                res.json({
                    message:"Jobseeker Doesn't Exists"
                })
             }
        }catch(error){
            return res.json({
                message:error.message
            })
        }
   
}