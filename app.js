const express = require('express');
require('express-async-errors');
const helmet=require('helmet');
const morgan=require('morgan');
const xss=require('xss-clean');
const db = require('./config/database');
const cookieParser = require('cookie-parser');
const { jobseekerRouter } = require('./jobseeker/index');
const errorHandler = require('./common/src/middlewares/error-handler');
const { recruiterRouter } = require('./recruiter/index');

if(!process.env.JWT_KEY) throw new Error("JWT_KEY is not defined")
if(!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not defined")

const app = express();
const port = process.env.PORT||3000;
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // secure headers
app.use(xss()); // prevent cross site scripting attacks
app.use(morgan("dev")); // log the request on the console
app.get('/', (req, res) => {
  return res.json({
    message: 'Welcome to Jobs4You',
  });
});

app.use(jobseekerRouter);
app.use(recruiterRouter);
app.all('*', (req, res) => {
  res.status(404).json({
    message: 'Page Not Found',
  });
});

app.use(errorHandler);

const start = async () => {
  try {
    await db.authenticate();
    //it will sync all the tables in the database
    await db.sync({
        force:true
    });
    console.log('Database Connected');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is up and running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
};
start();
