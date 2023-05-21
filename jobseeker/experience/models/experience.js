const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Jobseeker=require('../../user/models/jobseeker');
class Experience extends Model{}

Experience.init(
    {
        jobseeker_id:{
            type:DataTypes.UUID,
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
        tableName: 'experience',
        createdAt: false,
        updatedAt: false,
        underscore: false,
      }
)
Experience.removeAttribute('id');
Jobseeker.hasMany(Experience,{
    foreignKey:'jobseeker_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});
Experience.belongsTo(Jobseeker,{
    foreignKey:'jobseeker_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});



module.exports=Experience;