const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/database');
const Jobseeker = require('../../user/models/jobseeker');
const Skill = require('../../../skills/models/skill');
class JobseekerSkill extends Model {}

JobseekerSkill.init(
  {
    skill_id: {
      type: DataTypes.INTEGER,
    },
    jobseeker_id: {
      type: DataTypes.UUID,
    },
    skill_level: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
      allowNull: false,
    },
  },
  {
    // options
    sequelize,
    tableName: 'jobseeker_skill',
    createdAt: false,
    updatedAt: false,
    underscore: false,
  }
);
JobseekerSkill.removeAttribute('id');

// Associations

Jobseeker.belongsToMany(Skill, {
  through: JobseekerSkill,
  foreignKey: 'jobseeker_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Skill.belongsToMany(Jobseeker, {
  through: JobseekerSkill,
  foreignKey: 'skill_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = JobseekerSkill;
