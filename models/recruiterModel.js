const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const {phone} = require('phone');
const bcrypt=require('bcrypt');
class Recruiter extends Model{}

Recruiter.init(
    {
        recruiter_id:{
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
        reg_date:{
            type:DataTypes.DATE,
            allowNull:false,
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
        }

    },
    {
        sequelize,
        modelName: 'recruiter',
        tableName: 'recruiter',
        createdAt: false,
        updatedAt: false,
        underscore: false,
    }
)

Recruiter.removeAttribute('id');

Recruiter.sync()
.then(function () { 
    console.log("Recruiter Table Created Successfully");
})
.catch(function(err){
    console.log(err);
    })
    

Recruiter.beforeCreate(async function HashPassword(user,options){
    let salt=await bcrypt.genSalt();
    let hashedString= await bcrypt.hash(user.password,salt);
    user.password=hashedString;
    //   console.log(user.password);
    //   console.log(hashedString);

})

module.exports=Recruiter;
