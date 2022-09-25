const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
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

JobType.sync({
    alter: true,
}).then(function () { 
    console.log("JobType Table Created Successfully");
})
.catch(function(err){
console.log(err);
})

module.exports=JobType;