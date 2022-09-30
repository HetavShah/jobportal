const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const jobModel=require('./jobModel');
const jobseekerModel=require('./jobseekerModel');
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



module.exports=Apply;
