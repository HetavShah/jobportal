const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const jobseekerModel=require('./jobseekerModel')
const jobModel=require('./jobModel');
class Response extends Model{}

Response.init(
    {
        jobseeker_id:{
            type:DataTypes.UUID,
            allowNull:false
        },
        job_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        is_selected:{
            type:DataTypes.BOOLEAN
        },
        recruiter_id:{
            type:DataTypes.UUID,
            references:{
                model:'recruiter',
                key:'recruiter_id'
            },
            onDelete:'CASCADE',
            onUpdate:'CASCADE',
            allowNull:false           
        }
    },
    {
        sequelize,
        tableName: 'response',
        createdAt: false,
        updatedAt: false,
        underscore: false,
    }
)

jobseekerModel.belongsToMany(jobModel, {
    through: Response,
    unique: false,
    foreignKey: "jobseeker_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  
  jobModel.belongsToMany(jobseekerModel, {
    through: Response,
    unique: false,
    foreignKey: "job_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });



Response.removeAttribute('id');


module.exports=Response;