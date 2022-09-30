const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const {phone} = require('phone');
const bcrypt=require('bcrypt');
class Jobseeker extends Model{}

Jobseeker.init(
    {
        jobseeker_id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
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
            },
            unique:true,
        },
        alternate_contact:{
            type:DataTypes.STRING,
            validate:{
                validator: function(v){
                        return phone(v).isValid;
                }
            },
            unique:true,
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
            unique:true,
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

Jobseeker.beforeCreate(async function HashPassword(user,options){
    let salt=await bcrypt.genSalt();
    let hashedString= await bcrypt.hash(user.password,salt);
    user.password=hashedString;
    //   console.log(user.password);
    //   console.log(hashedString);

})

module.exports=Jobseeker;