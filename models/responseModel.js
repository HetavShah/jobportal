const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
class Response extends Model{}

Response.init(
    {
        jobseeker_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'jobseeker',
                key:'jobseeker_id'
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
        recruiter_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'recruiter',
                key:'recruiter_id'
            },
            allowNull:false
        }
    },
    {
        sequelize,
        modelName: 'response',
        tableName: 'response',
        createdAt: false,
        updatedAt: false,
        underscore: false,
    }
)

Response.removeAttribute('id');

Response.sync({
    alter: true,
}).then(function () { 
    console.log("Response Table Created Successfully");
})
.catch(function(err){
console.log(err);
})

module.exports=Response;