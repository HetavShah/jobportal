const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const jobModel=require('./jobModel');
class JobLocation extends Model{}

JobLocation.init(
    {
        location_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        street_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false
        },
        state:{
            type:DataTypes.STRING,
            allowNull:false
        },
        pincode:{
            type:DataTypes.STRING(6),
            allowNull:false,
            validate:{
                isNumeric :true
            }
        }

    },
    {
        sequelize,
        modelName: 'joblocation',
        tableName: 'joblocation',
        createdAt: false,
        updatedAt: false,
        underscore: false,
    }
)

JobLocation.removeAttribute('id');

module.exports=JobLocation;
