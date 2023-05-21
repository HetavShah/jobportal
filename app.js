const express = require('express');
require('express-async-errors');
const app = express();
const port = 3000;
const db = require('./config/database');
// const recruiterRoute=require('./routers/recruiterRouter');
const cookieParser = require('cookie-parser');
const { jobseekerRouter } = require('./jobseeker/index');
const errorHandler = require('./common/src/middlewares/error-handler');
const { recruiterRouter } = require('./recruiter/index');
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
  return res.json({
    message: 'Welcome to Jobs4You',
  });
});

app.use(jobseekerRouter);
app.use(recruiterRouter);
// app.use('/recruiter',recruiterRoute);
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
      force: true,
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
