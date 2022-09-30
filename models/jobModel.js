const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const JobType=require('./jobTypeModel');
const JobLocation=require('./jobLocationModel');
class Job extends Model{}

Job.init(
    {
        location_id:{
            type:DataTypes.INTEGER,
            allowNull:false

        },
        type_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        recruiter_id:{
                type:DataTypes.UUID,
                allowNull:false
            } , 
        job_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        descrip:{
            type:DataTypes.STRING,
            allowNull:false
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        },
        post_date:{
            type:DataTypes.DATE,
            allowNull:false
        }

    },
    {
        sequelize,
        modelName: 'job',
        tableName: 'job',
        createdAt: false,
        updatedAt: false,
        underscore: false,
    }
)

Job.removeAttribute('id');

JobType.hasMany(Job,{
    foreignKey:'type_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});
Job.belongsTo(JobType,{
    foreignKey:'type_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});


JobLocation.hasMany(Job,{
    foreignKey:'location_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});
Job.belongsTo(JobLocation,{
    foreignKey:'location_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});



module.exports=Job;
