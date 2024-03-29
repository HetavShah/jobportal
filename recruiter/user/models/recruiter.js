const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/database');
const { phone } = require('phone');
const bcrypt = require('bcrypt');
const Job = require('../../jobs/models/job');
class Recruiter extends Model {}

Recruiter.init(
  {
    recruiter_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validator: function (v) {
          return phone(v).isValid;
        },
      },
      unique: true,
    },
    alternate_contact: {
      type: DataTypes.STRING,
      validate: {
        validator: function (v) {
          return phone(v).isValid;
        },
      },
      unique: true,
    },
    reg_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'recruiter',
    createdAt: false,
    updatedAt: false,
    underscore: false,
  }
);

Recruiter.removeAttribute('id');

Recruiter.beforeSave(async function HashPassword(user, options) {
  if (user.changed('password')) {
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(user.password, salt);
    user.password = hashedString;
  }
});

Recruiter.hasMany(Job, {
  foreignKey: 'recruiter_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Job.belongsTo(Recruiter, {
  foreignKey: 'recruiter_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = Recruiter;
