const JWT_KEY=process.env.JWT_KEY;
const jwt=require('jsonwebtoken');
const NotAuthorizedError=require('../errors/not-autorized-error');
const requireAuth=async(req, res, next)=> {
    if (!req.cookies.login) throw new NotAuthorizedError(); 
      let token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY); 
      console.log(payload)// if sucessfull verification then jwt.verify will return payload which contains our userId
      if(!payload) throw new NotAuthorizedError();
      if(payload.isRecruiter)
      {
        req.user="recruiter"
      }
      else{
        req.user="jobseeker"
      }
      if(payload.isAdmin) req.user="admin"

      if(req.user!=="admin" && req.params.id!==payload.id) throw new NotAuthorizedError();
      next();
}

module.exports=requireAuth;