const { catchAsync } = require("../../Error&Res/controllerResponse");
const ErrorClass = require("../../Error&Res/ErrorClass");
const UserModel = require("../UserSec/User-Model");
const jwt = require("jsonwebtoken");
exports.secureRoute = catchAsync(async (req, res, next) => {
  //1)Check if token exists (all tokens must start with "Bearer")
  let token = req.headers["x-auth-token"];
  //2)validate the token (verify the signture is valid or not ===> verification)
  if (!token || token === "") {
    return next(new ErrorClass("You must log in first", 401));
  }
  //3)Check if the user exists or not
  const data = await jwt.verify(token, process.env.JWT_SECRET_PASS);
  if (!data) {
    return next(new ErrorClass("Wrong web token", 401));
  }
  //4)check if the password was changed
  const currentUser = await UserModel.findById(data.userId);
  if (!currentUser) {
    return next(new ErrorClass("User doesn't exists", 404));
  }
  req.user = data;
  next();
}, 404);
