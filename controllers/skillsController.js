const SkillsetModel=require("../models/skillsetModel");
const JobseekerModel=require("../models/jobseekerModel");
const JobseekerSKillModel=require("../models/jobseekerSkilllModel");


module.exports.getSkills=async function getSkills(req,res) {  
    try{

        let id=req.params.id;

        let user=await JobseekerSKillModel.findAll({
            include:[{
                model:SkillsetModel,
            }],
            attributes:{
                exclude:["skillset_id"]
            },
            where:{
                jobseeker_id:id
            }
        });
        return res.json({
            details:user
        })

    }
    catch(error){
        return res.status(422).json({
            message:error.message
        })
    }

}
module.exports.addSkills=async function addSkills(req,res) {  
    let id=req.params.id;
    let data=req.body;
    let skill_name=req.body["skill_name"];
    delete req.body["skill_name"];
    let skill;
    try{
        skill=await SkillsetModel.findOne({
            where:{
                skill_name:skill_name
            }
        });

        
        if(!skill){
            skill=await SkillsetModel.create({
                skill_name:skill_name
            });
        }
        data["skillset_id"]=skill[skillset_id];
        data["jobseeker_id"]=id;
        
            let dataCreated;
             dataCreated= await JobseekerSKillModel.create(data);
                return res.json({
                    message:"Data Created Successfully",
                   data:dataCreated
                });

    }catch(error){
        return res.status(422).json({
            message:error.message
        })
    }
}
module.exports.updateSkills=async function updateSkills(req,res) { 

    let dataTobeUpdated=req.body;       
    let skill_name=dataTobeUpdated["skill_name"];
    delete dataTobeUpdated["skill_name"];
    try{
        skill=await SkillsetModel.findOne({
            where:{
                skill_name:skill_name
            }
        })

        if(!skill){
            return res.status(404).json({
                message:"Skill Doesn't Added"
            })
        }
        let [updatedRow]=await JobseekerSKillModel.update(dataTobeUpdated,{
            where:{
                jobseeker_id:req.params.id,
                skillset_id:skill["skillset_id"]
            }
        })
        // let [updatedRow]=await JobseekerSKillModel.update(dataTobeUpdated,{      //Sequelize Doesn't Support Join Queries in Update Function
        //    include:[{
        //     model:SkillsetModel,
        //     where:{
        //         skill_name:dataTobeUpdated["skill_name"]
        //     }
        //    }]
        // })
        return res.json({
            message:updatedRow
        });

    }catch(error){
        return res.status(422).json({
            message:error.message
        })
    }


 }
module.exports.deleteSkills=async function deleteSkills(req,res) { 
    let skillTobeDeleted=req.body.skill_name;

    try{

       let skill=await SkillsetModel.findOne({
            where:{
                skill_name:skillTobeDeleted
            }
        })
        
        let deletedRow=await JobseekerSKillModel.destroy({
            where:{
                skillset_id:skill["skillset_id"]           
             }
        })
        return res.json({
            message:deletedRow
        })

    }catch(error){
        return res.status(422).json({
            message:error.message
        })
    }
 }