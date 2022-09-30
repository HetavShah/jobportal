const experienceModel=require('../models/experienceModel');

module.exports.getExperienceDetails=async function getExperienceDetails(req,res) {

    let id=req.params.id;

    try{

        let user=await experienceModel.findAll({      // Since Jobseeker Can Have Many experience Details
            where:{                                
                jobseeker_id:id
            }
        })

        if(user){
            return res.json({
                message:"experience Details",
                data:user
            })
        }

    }catch(error){
        return res.status(422).json({
            message:error.message
        })
    }
       

}
module.exports.createExperienceDetails=async function createExperienceDetails(req,res) { 

   try{    
           
            let data = req.body;      // Expecting array of objects where each object represents valid experience details
            let createdData=[];

            if (data) {
                for( let key in data){
                    let record=await experienceModel.create(data[key]);
                    createdData.push(record);
                }
            return res.status(200).json({
                message: "experience Details Created Successfully",
                data: createdData
            });
            } else {
            return res.status(422).json({
                message: "Invalid Details",
                });
            }
    }catch(error){

            return res.status(422).json({
                message:error.message
            })

        }
  }
module.exports.updateExperienceDetails=async function updateExperienceDetails(req,res) {  

    let id=req.params.id;
    let exp_id=req.params.expid;
    let dataToBeUpdated=req.body;
    try{

        let updatedData=await experienceModel.update(dataToBeUpdated,{
            where:{
                exp_id:exp_id,
                jobseeker_id:id
            }

        })

        return res.json({
            message:"data Updated Successfully",
            data:updatedData
        })

    }catch(error){

        return res.status(422).json({
            message:error.message
        })
    }

}
module.exports.deleteExperienceDetails=async function deleteExperienceDetails(req,res) { 


    let id=req.params.id;
    let exp_id=req.params.expid;
    try{

        let deletedData=await experienceModel.destroy({
            where:{
                exp_id:exp_id,
                jobseeker_id:id
            }

        })

        return res.json({
            message:"data Deleted Successfully",
            data:deletedData
        })

    }catch(error){

        return res.status(422).json({
            message:error.message
        })
    }


 }

