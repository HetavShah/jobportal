const express = require('express');
const { userRouter } = require('./user');
const { jobRouter } = require('./jobs');

const router = express.Router();

router.use(userRouter)
router.use(jobRouter);
module.exports = {
  recruiterRouter: router,
};
