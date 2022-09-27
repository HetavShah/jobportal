const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
class Experience extends Model{}

Experience.init(
    {
        jobseeker_id:{
            type:DataTypes.UUID,
            references:{
                model:'jobseeker',
                key:'jobseeker_id'
            },
            allowNull:false,
        },
        descrip:{
            type:DataTypes.STRING,
        },
        c_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        job_title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        start_date:{
            type:DataTypes.DATE,
            allowNull:false,
        },  
        end_date:{
            type:DataTypes.DATE,
            allowNull:false,
        }
    },
    {
        // options
        sequelize,
        modelName: 'experience',
        tableName: 'experience',
        createdAt: false,
        updatedAt: false,
        underscore: false,
      }
)
Experience.removeAttribute('id');

Experience.sync().then(function () { 
    console.log("Experience Table Created Successfully");
})
.catch(function(err){
console.log(err);
})

module.exports=Experience;