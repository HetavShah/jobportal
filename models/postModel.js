const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
class Post extends Model{}

Post.init(
    {
        job_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'job',
                key:'job_id'
            },
            allowNull:false
        },
        recruiter_id:{
            type:DataTypes.UUID,
            references:{
                model:'recruiter',
                key:'recruiter_id'
            },
            allowNull:false
        },
        post_date:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },
    {
        sequelize,
        modelName: 'post',
        tableName: 'post',
        createdAt: false,
        updatedAt: false,
        underscore: false,
    }
)

Post.removeAttribute('id');

Post.sync().then(function () { 
    console.log("Post Table Created Successfully");
})
.catch(function(err){
console.log(err);
})

module.exports=Post;