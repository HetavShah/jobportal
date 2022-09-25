const Sequelize=require('sequelize');

const sequelize = new Sequelize('jobportal', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    logging:false
  });
  
module.exports = sequelize;
