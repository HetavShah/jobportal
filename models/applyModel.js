const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
class Apply extends Model{}

Apply.init(
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
        apply_date:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },
    {
        sequelize,
        modelName: 'apply',
        tableName: 'apply',
        createdAt: false,
        updatedAt: false,
        underscore: false,
    }
)

Apply.removeAttribute('id');

Apply.sync({
    alter: true,
}).then(function () { 
    console.log("Apply Table Created Successfully");
})
.catch(function(err){
console.log(err);
})

module.exports=Apply;
