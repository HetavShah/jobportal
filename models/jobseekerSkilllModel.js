const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const jobseekerModel = require("./jobseekerModel");
const skillsetModel = require("./skillsetModel");
class JobseekerSkill extends Model {}

JobseekerSkill.init(
  {
    skillset_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "skillset",
        key: "skillset_id",
      },
      allowNull: false,
    },
    jobseeker_id: {
      type: DataTypes.UUID,
      references: {
        model: "jobseeker",
        key: "jobseeker_id",
      },
      allowNull: false,
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
    modelName: "jobseeker_skill",
    tableName: "jobseeker_skill",
    createdAt: false,
    updatedAt: false,
    underscore: false,
  }
);
JobseekerSkill.removeAttribute("id");

jobseekerModel.belongsToMany(skillsetModel, {
  through: JobseekerSkill,
  unique: false,
  foreignKey: "jobseeker_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

skillsetModel.belongsToMany(jobseekerModel, {
  through: JobseekerSkill,
  unique: false,
  foreignKey: "skillset_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});



module.exports = JobseekerSkill;
