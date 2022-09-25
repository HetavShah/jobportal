
module.exports.signup=function signup(req,res){
 
  if(req.baseUrl=='/jobseeker'){

   return res.json({
      message:"Jobseeker Signup"
    })
  }
  
  else if (req.baseUrl=='/recruiter'){

    return res.json({
      message:"Recruiter Signup"
    })
  }

  
}


module.exports.login=function login(req,res){
  if(req.baseUrl=='/jobseeker'){

    return res.json({
       message:"Jobseeker Login"
     })
   }
   
   else if (req.baseUrl=='/recruiter'){
 
     return res.json({
       message:"Recruiter Login"
     })
   }

}
