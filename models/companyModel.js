const { Sequelize, DataTypes, Model } = require("sequelize");
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
                isUrl:true
            }
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

Company.sync({
    alter: true,
}).then(function () { 
    console.log("Company Table Created Successfully");
})
.catch(function(err){
console.log(err);
})
module.exports=Company;
