const express = require('express');
const { signupRouter } = require('./routes/signup');
const { loginRouter } = require('./routes/login');
const { logoutRouter } = require('./routes/logout');
const { getRecruiterRouter } = require('./routes/get-recruiter');
const { deleteRecruiterRouter } = require('./routes/delete-recruiter');
const { updateRecruiterRouter } = require('./routes/update-recruiter');

const router = express.Router();

router.use(signupRouter);
router.use(loginRouter);
router.use(logoutRouter);
router.use(getRecruiterRouter);
router.use(deleteRecruiterRouter);
router.use(updateRecruiterRouter);

module.exports = {
  userRouter: router,
};
