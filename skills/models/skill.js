const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database");
class Skill extends Model{}

Skill.init(
    {
        skill_id:{
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
        tableName: 'skillset',
        createdAt: false,
        updatedAt: false,
        underscore: false,
      }
)
Skill.removeAttribute('id');

module.exports=Skill;