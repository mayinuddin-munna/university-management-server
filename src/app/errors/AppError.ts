class AppError extends Error {
    public stateCode: number;
  
    constructor(statusCode: number, message: string, stack = '') {
      super(message);
      this.stateCode = statusCode;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }

  export default AppError