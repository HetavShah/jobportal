const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
class JobReqSkill extends Model{}

JobReqSkill.init(
    {
        skillset_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'skillset',
                key:'skillset_id'
            },
            allowNull:false
        },
        job_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'job',
                key:'job_id'
            },
            allowNull:false
        },
        
    },
    {
        // options
        sequelize,
        modelName: 'jobreqskill',
        tableName: 'jobreqskill',
        createdAt: false,
        updatedAt: false,
        underscore: false,
    }
)
JobReqSkill.removeAttribute('id');

JobReqSkill.sync({
    alter: true,
}).then(function () { 
    console.log("JobReqSkill Table Created Successfully");
})
.catch(function(err){
console.log(err);
})

module.exports=JobReqSkill;