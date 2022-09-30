const { Sequelize, DataTypes, Model, UniqueConstraintError } = require("sequelize");
const sequelize = require("../config/database");
const recruiterModel=require('./recruiterModel');
const jobModel=require('./jobModel');
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

Company.hasMany(recruiterModel,{
    foreignKey:'company_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});
recruiterModel.belongsTo(Company,{
    foreignKey:'company_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});

module.exports=Company;
