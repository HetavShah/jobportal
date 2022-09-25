const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const {phone} = require('phone');
class Jobseeker extends Model{}

Jobseeker.init(
    {
        jobseeker_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,
        },
        first_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        middle_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        contact:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                validator: function(v){
                        return phone(v).isValid;
                }
            }
        },
        alternate_contact:{
            type:DataTypes.STRING,
            validate:{
                validator: function(v){
                        return phone(v).isValid;
                }
            }
        },
        gender:{
            type:DataTypes.CHAR(1),
            allowNull:false
        },
        reg_date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        dob:{
            type:DataTypes.DATE,
            allowNull:false
        }
   },
   {
     // options
     sequelize,
     modelName: 'jobseeker',
     tableName: 'jobseeker',
     createdAt: false,
     updatedAt: false,
     underscore: false,
   },

)
Jobseeker.removeAttribute('id');

Jobseeker.sync({
    alter: true,
}).then(function () { 
    console.log("Jobseeker Table Created Successfully");
})
.catch(function(err){
console.log(err);
})
module.exports=Jobseeker;