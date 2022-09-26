const { Sequelize, DataTypes, Model, UniqueConstraintError } = require("sequelize");
const sequelize = require("../config/database");
class Company extends Model{}

Company.init(
    {
        company_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true,
        },
        company_name:{
            type:DataTypes.STRING,
            allowNull:false
        }, 
        descrip:{
            type:DataTypes.STRING,
            allowNull:false
        },
        url:{
            type:DataTypes.STRING,
            validate:{
                isUrl:{
                    msg:"Not a valid Url"
                }
            },
            unique:true,
        }

    },
    {
        // options
        sequelize,
        modelName: 'company',
        tableName: 'company',
        createdAt: false,
        updatedAt: false,
        underscore: false,
      }
)
Company.removeAttribute('id');

Company.sync().then(function () { 
    console.log("Company Table Created Successfully");
})
.catch(function(err){
console.log(err);
})
module.exports=Company;
