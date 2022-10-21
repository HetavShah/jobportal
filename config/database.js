const Sequelize=require('sequelize');
require('dotenv').config();
const DB_LINK=process.env.DATABASE_URL;
console.log(DB_LINK);
const sequelize = new Sequelize(process.env.DATABASE_URL,{
  "dialectOptions": {
          "ssl": {
            "require": true,
            "rejectUnauthorized": false
         }
         },
         logging:false
})

  
module.exports = sequelize;
