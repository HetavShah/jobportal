const { validationResult } = require("express-validator");
const RequestValidationError = require("../errors/request-validation-error");

const validateRequest=(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors);
    throw new RequestValidationError(errors.array());
  }
  next();
}
module.exports = validateRequest;
