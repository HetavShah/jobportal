const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const jobseekerModel=require('./jobseekerModel');
class Experience extends Model{}

Experience.init(
    {
        jobseeker_id:{
            type:DataTypes.UUID,
            allowNull:false
        },
        exp_id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        descrip:{
            type:DataTypes.STRING,
        },
        c_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        job_title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        start_date:{
            type:DataTypes.DATE,
            allowNull:false,
        },  
        end_date:{
            type:DataTypes.DATE,
            allowNull:false,
        }
    },
    {
        // options
        sequelize,
        modelName: 'experience',
        tableName: 'experience',
        createdAt: false,
        updatedAt: false,
        underscore: false,
      }
)
Experience.removeAttribute('id');

jobseekerModel.hasMany(Experience,{
    foreignKey:'jobseeker_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});
Experience.belongsTo(jobseekerModel,{
    foreignKey:'jobseeker_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});



module.exports=Experience;