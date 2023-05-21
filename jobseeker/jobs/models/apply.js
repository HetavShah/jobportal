const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/database');
const Job = require('../../../recruiter/jobs/models/job');
const Jobseeker = require('../../user/models/jobseeker');
const Response = require('../../../jobs/models/response');
class Apply extends Model {}

Apply.init(
  {
    jobseeker_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    job_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'job',
        key: 'job_id',
      },
      allowNull: false,
    },
    apply_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'apply',
    createdAt: false,
    updatedAt: false,
    underscore: false,
  }
);

Apply.removeAttribute('id');

JobSeeker.belongsToMany(Job, {
  through: Apply,
  unique: false,
  foreignKey: 'jobseeker_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Job.belongsToMany(Jobseeker, {
  through: Apply,
  unique: false,
  foreignKey: 'job_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Apply.afterCreate(async function AddtoResponse(apply, option) {
  try {
    // console.log(apply);

    let data = {
      jobseeker_id: apply['jobseeker_id'],
      job_id: apply['job_id'],
    };
    let job = await jobModel.findOne({
      where: {
        job_id: apply['job_id'],
      },
    });
    data['recruiter_id'] = job['recruiter_id'];
    await ResponseModel.create(data);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
});
Apply.afterDestroy(async function DeleteFromResponse(apply, option) {
  try {
    let data = await ResponseModel.destroy({
      where: {
        job_id: apply['job_id'],
        jobseeker_id: apply['jobseeker_id'],
      },
    });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Apply;
