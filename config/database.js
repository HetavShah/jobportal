const Sequelize=require('sequelize');
require('dotenv').config();
const DB_LINK=process.env.DATABASE_URL;
let sequelize;
if(DB_LINK==process.env.LOCAL_DB_LINK)

{
  
   sequelize = new Sequelize(DB_LINK,{
  
           logging:false,
  });
}
else{
  sequelize= new Sequelize(DB_LINK,{
    logging:false,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
     }
     },
  });

}

  
module.exports = sequelize;
