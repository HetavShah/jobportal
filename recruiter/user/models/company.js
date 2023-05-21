const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/database');
const Recruiter = require('./recruiter');
const Job = require('../../jobs/models/job');
class Company extends Model {}

Company.init(
  {
    company_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descrip: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'Not a valid Url',
        },
      },
      unique: true,
    },
  },
  {
    // options
    sequelize,

    tableName: 'company',
    createdAt: false,
    updatedAt: false,
    underscore: false,
  }
);
Company.removeAttribute('id');

Company.hasMany(Recruiter, {
  foreignKey: 'company_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Recruiter.belongsTo(Company, {
  foreignKey: 'company_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = Company;
