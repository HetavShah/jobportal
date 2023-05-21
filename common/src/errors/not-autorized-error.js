const CustomError = require("./custom-error");

class NotAuthorizedError extends CustomError{
  constructor()
  {
      super("Not Authorized",401);
  }
}

module.exports = NotAuthorizedError;