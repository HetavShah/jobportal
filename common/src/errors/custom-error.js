class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
  formattedErrorMessage(){
    return [
      {
        message:this.message,
      }
    ]
  }
}

module.exports = CustomError;
