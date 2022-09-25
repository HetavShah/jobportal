const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
class Job extends Model{}

Job.init(
    {
        job_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        company_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'company',
                key:'company_id'
            },
            allowNull:false
        },
        type_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'jobtype',
                key:'type_id'
            },
            allowNull:false
        },
        location_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'joblocation',
                key:'location_id'
            },
            allowNull:false
        },
        descrip:{
            type:DataTypes.STRING,
            allowNull:false
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        }

    },
    {
        sequelize,
        modelName: 'job',
        tableName: 'job',
        createdAt: false,
        updatedAt: false,
        underscore: false,
    }
)

Job.removeAttribute('id');

Job.sync({
    alter: true,
}).then(function () { 
    console.log("Job Table Created Successfully");
})
.catch(function(err){
console.log(err);
})

module.exports=Job;
