const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/database');
const Jobseeker = require('../../../jobseeker/user/models/jobseeker');
const Recruiter=require('../../user/models/recruiter');
const Job = require('../models/job');
class Response extends Model {}

Response.init(
  {
    jobseeker_id:{
      type:DataTypes.UUID,

  },
  job_id:{
      type:DataTypes.INTEGER,

  },
  is_selected:{
      type:DataTypes.BOOLEAN
  },
  recruiter_id:{
      type:DataTypes.UUID,         
  },
  apply_date:{
    type:DataTypes.DATE, 
  }
  },
  {
    sequelize,
    tableName: 'response',
    createdAt: false,
    updatedAt: false,
    underscore: false,
  }
);

Jobseeker.belongsToMany(Job, {
  through: Response,
  foreignKey: 'jobseeker_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Job.belongsToMany(Jobseeker, {
  through: Response,
  foreignKey: 'job_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Recruiter.hasMany(Response, {
  foreignKey: 'recruiter_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Response.belongsTo(Recruiter, {
  foreignKey: 'recruiter_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Jobseeker.hasMany(Response, {
  foreignKey: 'jobseeker_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Response.belongsTo(Jobseeker, {
  foreignKey: 'jobseeker_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});



Response.removeAttribute('id');

module.exports = Response;
