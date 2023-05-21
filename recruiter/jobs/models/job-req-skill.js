const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/database');
const Skill= require('../../../skills/models/skill');
const Job = require('./job');
class JobReqSkill extends Model {}

JobReqSkill.init(
  {
    skill_id: {
      type: DataTypes.INTEGER,
    },
    job_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // options
    sequelize,
    tableName: 'jobreqskill',
    createdAt: false,
    updatedAt: false,
    underscore: false,
  }
);

Job.belongsToMany(Skill, {
  through: JobReqSkill,
  foreignKey: 'job_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Skill.belongsToMany(Job, {
  through: JobReqSkill,
  foreignKey: 'skill_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = JobReqSkill;
