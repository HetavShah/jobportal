const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
class Education extends Model{}

Education.init(
    {
        jobseeker_id:{
            type:DataTypes.UUID,
            references:{
                model:'jobseeker',
                key:'jobseeker_id'
            },
            allowNull:false
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

Education.sync().then(function () { 
    console.log("Education Table Created Successfully");
})
.catch(function(err){
console.log(err);
})

module.exports=Education;


