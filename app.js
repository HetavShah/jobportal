const express=require('express')
const app=express();
const port=3000;
const db = require("./config/database");
const jobseekerRouter=require('./routers/jobseekerRouter');
const recruiterRoute=require('./routers/recruiterRouter');
const testingTables=require('./testingTables');
const cookieParser=require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.use('/jobseeker',jobseekerRouter);
app.use('/recruiter',recruiterRoute);


const initApp = async () => {
    try {
        await db.authenticate();
        console.log("Database Connected");
        app.listen(port, () => {
            console.log(`Server is up and running at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.message);
    }
};
initApp();