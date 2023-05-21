const express = require('express');

const router = express.Router();

router.post(
  '/api/jobseeker/logout',
  async (req, res)=> {
    
    res.cookie("login", " ", { maxAge: 1 });
    res.json({
      message: "User logged out succesfully",
    });
  
  }
);

module.exports = {
  logoutRouter: router,
};
