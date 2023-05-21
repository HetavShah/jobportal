const Sequelize=require('sequelize');
require('dotenv').config();
const DB_LINK=process.env.DATABASE_URL;
const sequelize = new Sequelize(DB_LINK,{
         logging:false
})

  
module.exports = sequelize;
