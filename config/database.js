const Sequelize=require('sequelize');
require('dotenv').config();
const DB_LINK=process.env.DB_LINK;
const sequelize = new Sequelize(DB_LINK,{
  "dialectOptions": {
          "ssl": {
            "require": true,
            "rejectUnauthorized": false
         }
         },
         logging:false
})
// const sequelize = new Sequelize('d1kqvdl0ca6ojj', 'hapbdmvaeqicms', '934c2288979db9191815178af8fef4676123efecad8538e91d742a67d4bf422d', {
//     host: 'ec2-54-209-66-211.compute-1.amazonaws.com',
//     dialect: 'postgres',/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//     logging:false,
//     "dialectOptions": {
//       "ssl": {
//         "require": true,
//         "rejectUnauthorized": false
//       }
//     }
//   });
  
module.exports = sequelize;
