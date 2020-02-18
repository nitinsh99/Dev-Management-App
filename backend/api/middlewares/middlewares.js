const ErrorClass = require("../../Error&Res/ErrorClass");
const {
  catchAsync,
  successRes
} = require("../../Error&Res/controllerResponse");
const ProjectModel = require("../ProjectSec/Project-Model");
const UserModel = require("../UserSec/User-Model");
const SectionModel = require("../SectionSec/Section-Model");
const TaskModel = require("../TaskSec/Task-Model");
const jwt = require("jsonwebtoken");
const { checkIdExists } = require("../util/method");

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

/**
 * @filter project
 */
exports.projectCRUDFilter = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const { userId } = req.user;
  //Check if the project exists
  if (checkIdExists(projectId) === false) {
    return res
      .status(200)
      .json(
        successRes("Please create a project or join a project to work on.")
      );
  }
  const currentProject = await ProjectModel.findById(projectId)
    .populate({
      path: "allStaff",
      select: "firstName lastName role profileImage createdAt username"
    })
    .populate({
      path: "projectManager",
      select: "firstName lastName role profileImage createdAt"
    })
    .populate({
      path: "allSections",
      select: "title status user createdAt"
    });
  if (!currentProject) {
    return next(new ErrorClass("This project doesn't exists", 400));
  }
  //Check if the user is part of the project
  const currentUser = await UserModel.findById(userId);
  if (currentUser.project.toString() !== projectId.toString()) {
    return next(new ErrorClass("Sorry! You are not part of this team", 400));
  }
  req.project = currentProject;
  next();
}, 404);

/**
 * @filter section
 */
exports.checkIfSectionExistsRoute = catchAsync(async (req, res, next) => {
  const { sectionId } = req.params;
  const currentSection = await SectionModel.findById(sectionId);
  if (!currentSection) {
    return next(new ErrorClass("This Section doesn't exists", 404));
  }
  req.section = currentSection;
  next();
}, 404);

/**
 * @filter task
 */
exports.checkIfTaskExists = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;
  const currentTask = await TaskModel.findById(taskId);
  if (!currentTask) {
    return next(new ErrorClass("Task doesn't exists", 404));
  }
  req.task = currentTask;
  next();
}, 404);

/**
 * @filter admin
 */

exports.checkIfUserIsThePMRoute = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { projectId } = req.params;
  const currentProject = await ProjectModel.findById(projectId);
  if (currentProject.projectManager["_id"].toString() !== userId.toString()) {
    return next(
      new ErrorClass(
        "Sorry! You are not allow because you are not a Project Manager",
        400
      )
    );
  }
  next();
}, 404);
exports.identifyUserIsPMOrNot = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { projectId } = req.params;
  const currentProject = await ProjectModel.findById(projectId);

  if (currentProject.projectManager["_id"].toString() !== userId.toString()) {
    req.PM = false; //Not PM
  } else {
    req.PM = true; //PM
  }
  next();
}, 404);

exports.checkIfUserIsThePAMorPMRoute = catchAsync(async (req, res, next) => {
  const { projectId, sectionId } = req.params;
  const { userId } = req.user;
  const currentSection = await SectionModel.findById(sectionId);
  const currentProject = await ProjectModel.findById(projectId);
  if (
    currentSection.user.toString() !== userId.toString() &&
    currentProject.user.toString() !== userId.toString()
  ) {
    return next(
      new ErrorClass(
        "You are neither a PM nor a PAM, you are not allow to make changes",
        400
      )
    );
  }
  next();
}, 404);
