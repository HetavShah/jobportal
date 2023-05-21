const {  DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/database');
class JobType extends Model {}

JobType.init(
  {
    type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    job_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // options
    sequelize,
    tableName: 'jobtype',
    createdAt: false,
    updatedAt: false,
    underscore: false,
  }
);
JobType.removeAttribute('id');

module.exports = JobType;
