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
            return res.status(422).json({
                message:error.message
            })
        }
   
}

module.exports.updateJobseekerById=async function updateJobseeekerById(req,res){

    let id=req.params.id;
    let dataTobeUpdated=req.body;
    try{

        let user=await JobseekerModel.findOne({
            where:{
                jobseeker_id:id
            }
        });

        if(user){

            if(!Object.keys(dataTobeUpdated).length){
                return res.json({
                    message:"Provide Updation Data"
                })
            }

            let keys=[];
            for(let key in dataTobeUpdated){
                keys.push(key);
            }
            for(let i=0;i<keys.length;i++){
                user[keys[i]]=dataTobeUpdated[keys[i]];
            }

           let updatedData= await user.save();

           return res.json({
            message:"Data Updated SuccessFully",
            data:updatedData
           });

        }else{
            return res.status(404).json({
                message:"Jobseeker Doesn't Exists"
            })
        }

    }catch(error){

        return res.status(422).json({
            message:error.message
        })
    }
}

module.exports.deleteJobseekerById=async function deleteJobseeekerById(req,res){

    //Deleting Education Details , Experience Details etc is still remaining

    let id=req.params.id;
    try{

        let user=await JobseekerModel.findOne({
            where:{
                jobseeker_id:id
            }
        });

        if(user){

            

          await JobseekerModel.destroy({
                where:{
                    jobseeker_id:id
                }
            })

                return res.json({
                    message:"Data Deleted Sucessfully"
                })
            
            
        }else{
            return res.status(404).json({
                message:"User Doesn't Exist"
            })
        }

    }catch(error){

        return res.status(422).json({
            message:error.message
        })
    }
}
