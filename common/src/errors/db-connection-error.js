const CustomError = require("./custom-error");

class DbConnectionError extends CustomError{
  constructor()
  {
    super("Error Connecting to Database",500);
  }
}

module.exports = DbConnectionError;