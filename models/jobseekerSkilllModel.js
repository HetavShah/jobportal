const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
class JobseekerSkill extends Model{}

JobseekerSkill.init(
    {
        skillset_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'skillset',
                key:'skillset_id'
            }
        },
        jobseeker_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'jobseeker',
                key:'jobseeker_id'
            },
            allowNull:false
        },
        skill_level:{
            type:DataTypes.INTEGER,
            validate:{
               min:1,
               max:5
            }
        }
    },
    {
        // options
        sequelize,
        modelName: 'jobseeker_skill',
        tableName: 'jobseeker_skill',
        createdAt: false,
        updatedAt: false,
        underscore: false,
      }
)
JobseekerSkill.removeAttribute('id');

JobseekerSkill.sync({
    alter: true,
}).then(function () { 
    console.log("JobseekerSkill Table Created Successfully");
})
.catch(function(err){
console.log(err);
})

module.exports=JobseekerSkill;


