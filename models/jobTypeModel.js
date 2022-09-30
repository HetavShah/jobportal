const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const jobModel=require('./jobModel');
class JobType extends Model{}

JobType.init(
    {
        type_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        job_type:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        
    },
    {
        // options
        sequelize,
        modelName: 'jobtype',
        tableName: 'jobtype',
        createdAt: false,
        updatedAt: false,
        underscore: false,
      }
)
JobType.removeAttribute('id');





module.exports=JobType;