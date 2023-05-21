const { DataTypes, Model, UUIDV4 } = require('sequelize');
const sequelize = require('../../../config/database');
const JobType = require('./job-type');
const JobLocation = require('./job-location');
class Job extends Model {}

Job.init(
  {
    location_id: {
      type: DataTypes.INTEGER,

    },
    type_id: {
      type: DataTypes.INTEGER,

    },
    recruiter_id: {
      type: DataTypes.UUID,
    },
    job_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4,
    },
    descrip: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },

    post_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiry_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
  },
  {
    sequelize,

    tableName: 'job',
    createdAt: false,
    updatedAt: false,
    underscore: false,
  }
);

Job.removeAttribute('id');

JobType.hasMany(Job, {
  foreignKey: 'type_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Job.belongsTo(JobType, {
  foreignKey: 'type_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

JobLocation.hasMany(Job, {
  foreignKey: 'location_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Job.belongsTo(JobLocation, {
  foreignKey: 'location_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = Job;
