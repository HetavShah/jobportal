const CustomError = require("./custom-error");

class NotFoundError extends CustomError{
  constructor(message)
  {    
    super(message,404);
  }

}

module.exports = NotFoundError;