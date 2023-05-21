const CustomError = require("./custom-error");

class BadRequestError extends CustomError{
  constructor(msg){
    super(msg,400);
  }
}

module.exports = BadRequestError;