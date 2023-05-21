const CustomError = require("./custom-error");

class RequestValidationError extends CustomError{
  constructor(errors)
  {
    super("Invalid Request",400);
    this.errors=errors;
  }
  formattedErrorMessage(){
    return this.errors.map(err=>{
      return {
        message:err.msg,
        field:err.path
      };
    });
  }
}

module.exports=RequestValidationError;