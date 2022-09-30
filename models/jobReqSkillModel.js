const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const skillsetModel=require('./skillsetModel');
const jobModel=require('./jobModel');
class JobReqSkill extends Model{}

JobReqSkill.init(
    {
        skillset_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'skillset',
                key:'skillset_id'
            },
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
        
    },
    {
        // options
        sequelize,
        modelName: 'jobreqskill',
        tableName: 'jobreqskill',
        createdAt: false,
        updatedAt: false,
        underscore: false,
    }
)
JobReqSkill.removeAttribute('id');

jobModel.belongsToMany(skillsetModel, {
    through: JobReqSkill,
    unique: false,
    foreignKey: "job_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  
  skillsetModel.belongsToMany(jobModel, {
    through: JobReqSkill,
    unique: false,
    foreignKey: "skillset_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });



module.exports=JobReqSkill;