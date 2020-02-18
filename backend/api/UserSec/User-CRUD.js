const UserModel = require("./User-Model");
const ProjectModel = require("../ProjectSec/Project-Model");
const {
  catchAsync,
  successRes
} = require("../../Error&Res/controllerResponse");
const ErrorClass = require("../../Error&Res/ErrorClass");
const bcrypt = require("bcryptjs");
const { jwtTokenGenerator } = require("../jwtSec/jwtMethods");
const { undefineIfNotFound } = require("../util/method");
const sendEmail = require("../util/sendMail");
const { resetPasswordFunction } = require("../util/method");
const TeamReqModel = require("../TeamReqSec/TeamReq-Model");
/**
 * ==================================================================================
 * @ROUTE /api/v1/users/signup
 * @DES Sign-up
 * @Access Public
 * @Test Yes
 * @Check Yes
 * @Error no
 * @Method POST
 * ==================================================================================
 */
exports.signup = catchAsync(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    role,
    provinceOrState,
    country,
    username,
    company,
    profileImage,
    project,
    password
  } = req.body;
  const newUser = await UserModel.create(
    undefineIfNotFound({
      firstName,
      lastName,
      email,
      role,
      provinceOrState,
      country,
      username,
      company,
      profileImage,
      project,
      password
    })
  );
  if (newUser === null) {
    return next(new ErrorClass("Fail to create the new user", 404));
  }
  const jwtToken = jwtTokenGenerator(newUser["_id"]);
  res.status(201).json(successRes("User Registered", newUser, jwtToken));
}, 404);

/**
 * ==================================================================================
 * @ROUTE /api/v1/users/signin
 * @DES signin
 * @Access Public
 * @Test Yes
 * @Check Yes
 * @Error no
 * @Method POST
 * ==================================================================================
 */

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1) Check if the email and password exists
  if (!email || !password) {
    return next(
      new ErrorClass("We need both email and password, please try again!", 400)
    );
  }
  //2)Check if user exists
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new ErrorClass("User doesn't exists, please create a new account", 404)
    );
  }
  //2.5) Check if email and password are correct
  const matchPassword = await bcrypt.compare(password, user.password); //.compare compare the unhashed password vs hashed password
  //3)send token to client;
  if (matchPassword === false) {
    return next(
      new ErrorClass("Email or Password wasn't correct, please try again!", 400)
    );
  }
  
  let jwtToken, userData
  try {
    jwtToken = jwtTokenGenerator(user["_id"]);
    userData = await UserModel.findById(user["_id"]);
  } catch (error) {
    console.log(error)
  }

  res.status(200).json(successRes("Login Successful", userData, jwtToken));
}, 404);
/**
 * ==================================================================================
 * @ROUTE /api/v1/users/search-users
 * @DES search users
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error no
 * @Method GET
 * ==================================================================================
 */
exports.searchUsers = catchAsync(async (req, res, next) => {
  const { search } = req.query;
  if (search === undefined) {
    return next(new ErrorClass("Input is not found", 400));
  }
  const results = await UserModel.find({
    username: { $regex: `^${search}`, $options: "i" }
  });
  res
    .status(200)
    .json(
      successRes(
        search ? `User with :"${search}" is found!` : "Here are all the users",
        results
      )
    );
}, 404);
/**
 * ==================================================================================
 * @ROUTE /api/v1/users/get-user
 * @DES Delete User
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error no
 * @Method GET
 * ==================================================================================
 */
exports.getUser = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const currentUser = await UserModel.findById(userId);
  const { username } = currentUser;
  res.status(200).json(successRes(`@${username} is found.`, currentUser));
}, 404);

/**
 * ==================================================================================
 * @ROUTE /api/v1/users/update-password
 * @DES UPDATE User password
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error no
 * @Method PUT
 * ==================================================================================
 */

exports.updatePassword = catchAsync(async (req, res, next) => {
  //Destructuring:
  const { currentPassword, password } = req.body;
  if (currentPassword === password) {
    return next(
      new ErrorClass(
        "Please enter a different password than your current password",
        400
      )
    );
  }
  const { userId } = req.user;
  //Make sure all values are filled
  if (!currentPassword || !password) {
    return next(
      new ErrorClass(
        "Please enter your current password, new password that you want to change, and the password confirmation",
        400
      )
    );
  }
  //1) Find the User using its id
  const currentUser = await UserModel.findOne({ _id: userId }).select(
    "+password"
  );
  //2) Check if current password is correct or not
  const matchPassword = await bcrypt.compare(
    currentPassword,
    currentUser.password
  );
  if (matchPassword === false) {
    return next(
      new ErrorClass(
        "Please enter the correct password before update the new password",
        401
      )
    );
  }
  //3) Reset the Password
  const newJWTToken = await resetPasswordFunction(currentUser, password);
  //4) Send the Response to the POSTMAN
  res.status(200).json({
    status: "success",
    token: newJWTToken,
    message: "Password is updated"
  });
}, 404);
/**
 * ==================================================================================
 * @ROUTE /api/v1/users/update-user-info
 * @DES UPDATE User info
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error no
 * @Method PUT
 * ==================================================================================
 */
exports.updateUser = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const {
    firstName,
    lastName,
    email,
    role,
    provinceOrState,
    country,
    username,
    company,
    profileImage,
    project
  } = req.body;
  const contentBody = undefineIfNotFound({
    firstName,
    lastName,
    email,
    role,
    provinceOrState,
    country,
    username,
    company,
    profileImage,
    project
  });
  await UserModel.findByIdAndUpdate(userId, contentBody, {
    new: true,
    runValidators: true
  });
  const updatedUserInfo = await UserModel.findById(userId);
  if (!updatedUserInfo) {
    return next(
      new ErrorClass("User Doesn't Exists, something is wrong!", 404)
    );
  }
  res
    .status(200)
    .json(
      successRes(`@${updatedUserInfo.username} is updated`, updatedUserInfo)
    );
}, 404);

/**
 * ==================================================================================
 * @ROUTE /api/v1/users/forgotpassword
 * @DES forgot password
 * @Access public
 * @Test yes
 * @Check yes
 * @Error No
 * @Method GET
 * ==================================================================================
 */
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  //1) Get User Email to get user info
  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new ErrorClass("User Doesn't Exists", 404));
  }
  //2) Generate a new token
  const resetToken = user.createPasswordReset();
  await user.save({ validateBeforeSave: false }); //overwrite the data
  //3) Send it to the user's email
  await sendEmail({
    to: user.email,
    from: `DevManagement <${process.env.EMAIL_USERNAME}>`,
    subject:
      "Your password reset token has sent. Please set your password as soon as possible",
    text: "text",
    html: `
    <h2>Reset Password</h2>
    <p>New Password: "<b>${resetToken}</b>"</p>
    <p>Message: Please reset your password as soon as possible after you login using above password.</p>
  `
  });
  res
    .status(200)
    .json(successRes(`Reset URL is sent to your email address: ${email}`));
}, 404);
/**
 * ==================================================================================
 * @ROUTE /api/v1/users/delete-user-from-my-project/:currentUserId
 * @DES Delete user from project
 * @Access Private
 * @Test yes
 * @Check yes
 * @Error No
 * @Method DELETE
 * ==================================================================================
 */
exports.deleteUserFromAProject = catchAsync(async (req, res, next) => {
  const { currentUserId } = req.params;
  const currentUser = await UserModel.findById(currentUserId);
  if (!currentUser) {
    return next(new ErrorClass("This user doesn't exists", 404));
  }
  const { username, project, _id } = currentUser;
  const currentProject = await ProjectModel.findById(project);
  if (!currentProject) {
    return next(
      new ErrorClass(
        "You have no project. Please either join a project or create a project",
        404
      )
    );
  }

  if (project.toString() !== currentProject["_id"].toString()) {
    return next(
      new ErrorClass("This user doesn't belong to this project", 404)
    );
  }
  if (currentProject.projectManager.toString() === currentUserId.toString()) {
    return next(
      new ErrorClass(
        "You are the Project Manager, you can't remove yourself from the project. Unless you delete the project.",
        404
      )
    );
  }
  await TeamReqModel.deleteMany({
    $and: [{ project }, { $or: [{ sender: _id }, { receiver: _id }] }]
  });
  await UserModel.findByIdAndUpdate(currentUserId, {
    project: null
  });
  res.status(200).json(successRes(`${username} is deleted from the team`));
}, 404);

/**
 * ==================================================================================
 * @ROUTE /api/v1/users/delete-user
 * @DES Delete User
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error no
 * @Method DELETE
 * ==================================================================================
 */
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const currentUser = await UserModel.findById(userId);
  if (!currentUser) {
    return next(new ErrorClass("This user doesn't exist", 404));
  }
  const { username } = currentUser;
  await currentUser.remove();
  res
    .status(200)
    .json(
      successRes(
        `@${username} is deleted. Thank you for choosing Dev Management!`
      )
    );
}, 404);
