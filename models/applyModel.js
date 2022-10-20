const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const jobModel=require('./jobModel');
const jobseekerModel=require('./jobseekerModel');
const ResponseModel=require('./responseModel');
class Apply extends Model{}

Apply.init(
    {
        jobseeker_id:{
            type:DataTypes.UUID,
            allowNull:false
        },
        job_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'job',
                key:'job_id'
            },
            allowNull:false
        },
        apply_date:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },
    {
        sequelize,
        modelName: 'apply',
        tableName: 'apply',
        createdAt: false,
        updatedAt: false,
        underscore: false,
    }
)

Apply.removeAttribute('id');

jobseekerModel.belongsToMany(jobModel, {
  through: Apply,
  unique: false,
  foreignKey: "jobseeker_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
 
});

jobModel.belongsToMany(jobseekerModel, {
  through: Apply,
  unique: false,
  foreignKey: "job_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Apply.afterCreate(async function AddtoResponse(apply,option){
try{
    // console.log(apply);

    let data={
        jobseeker_id:apply["jobseeker_id"],
        job_id:apply["job_id"],
    }
    let job=await jobModel.findOne({

        where:{
            job_id:apply["job_id"]
        }
    })
    data["recruiter_id"]=job["recruiter_id"];
    await ResponseModel.create(data);
    // console.log(data);

}
catch(error){
    console.log(error);
}

});
Apply.afterDestroy(async function DeleteFromResponse(apply,option){
    try{

       let data= await ResponseModel.destroy({
            where:{
                job_id:apply["job_id"],
                jobseeker_id:apply["jobseeker_id"]
            }
        })
        // console.log(data);
    }catch(error){
        console.log(error);
    }
})

module.exports=Apply;
