const ErrorClass = require("./ErrorClass");

const developerError = err => {
  return {
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err
  };
};

const productionError = err => {
  if (err.operational === true) {
    return {
      status: err.status,
      message: err.message || err.error
    };
  } else {
    //1) log the error first
    console.error("Error!!!!!", error);
    //2) Send the Error
    return {
      status: "Error",
      message: "Sorry! Something is wrong."
    };
  }
};

MainErrorHanding = (err, req, res, next) => {
  console.log("err", err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json(developerError(err));
  } else {
    let clearError = { ...err };
    /**
     * Cast Error Message
     */
    if (clearError.error.name === "CastError") {
      let message = `Error ${clearError.error.path}: ${clearError.error.value}`;
      clearError.error.message = message;
      clearError = new ErrorClass(clearError.error, clearError.statusCode);
    } else if (clearError.error.code === 11000) {
      /**
       * Duplicated Error Message
       */
      // let message = "Error===> duplicate error";
      const key = Object.keys(clearError.error.keyValue)[0];
      const value = clearError.error.keyValue[key];
      console.log("clearError.error", clearError.error);
      clearError.error.message = `This ${key}: ${value} is duplicated.`;
      clearError = new ErrorClass(clearError.error, clearError.statusCode);
    } else if (clearError.error.name === "ValidationError") {
      /**
       * Data Validation Error
       */
      let message = [];
      for (let [key, value] of Object.entries(clearError.error.errors)) {
        message.push(value.message);
      }
      clearError = new ErrorClass(message.join(". "), clearError.statusCode);
    } else if (clearError.error.name === "JsonWebTokenError") {
      /**
       * Wrong Web Token
       */
      clearError.error.message = "Wrong Web Token";
      clearError = new ErrorClass(clearError.error, clearError.statusCode);
    } else if (clearError.error.name === "TokenExpiredError") {
      /**
       * Expire Web Token
       */
      clearError.error.message = "Web Token Expired";
      clearError = new ErrorClass(clearError.error, clearError.statusCode);
    }
    res.status(err.statusCode).json(productionError(clearError));
  }
};
module.exports = MainErrorHanding;
