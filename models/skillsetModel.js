const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
class Skillset extends Model{}

Skillset.init(
    {
        skillset_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        skill_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        
    },
    {
        // options
        sequelize,
        modelName: 'skillset',
        tableName: 'skillset',
        createdAt: false,
        updatedAt: false,
        underscore: false,
      }
)
Skillset.removeAttribute('id');

module.exports=Skillset;