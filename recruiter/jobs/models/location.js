const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/database');
class JobLocation extends Model {}

JobLocation.init(
  {
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,

    tableName: 'joblocation',
    createdAt: false,
    updatedAt: false,
    underscore: false,
  }
);

JobLocation.removeAttribute('id');

module.exports = JobLocation;
