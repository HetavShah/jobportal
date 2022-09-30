const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const jobseekerModel=require('./jobseekerModel');
class Education extends Model{}

Education.init(
    {
        jobseeker_id:{
            type:DataTypes.UUID,
            allowNull:false
        },
        edu_id:{
            type:DataTypes.UUID,
            allowNull:false,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        university_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        start_year:{
            type:DataTypes.INTEGER(4),
            allowNull:false,
            validate:{
                len:[4]
            }
        },  
        end_year:{
            type:DataTypes.INTEGER(4),
            allowNull:false,
            validate:{
                len:[4]
            }
        },
        major_course:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        degree:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    },
    {
        // options
        sequelize,
        validate:{
            isEndYearGreater(){
                if(this.start_year>=this.end_year)
                throw new Error("End Year Must Be Greater then Start Year");
            }
        },
        modelName: 'education',
        tableName: 'education',
        createdAt: false,
        updatedAt: false,
        underscore: false,
      }
)
Education.removeAttribute('id');

jobseekerModel.hasMany(Education,{
    foreignKey:'jobseeker_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});
Education.belongsTo(jobseekerModel,{
    foreignKey:'jobseeker_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});



module.exports=Education;


