const ProjectModel = require("./Project-Model");
const UserModel = require("../UserSec/User-Model");
const {
  catchAsync,
  successRes
} = require("../../Error&Res/controllerResponse");
const { updateUserProjectId } = require("../util/method");
const ErrorClass = require("../../Error&Res/ErrorClass");
const { undefineIfNotFound } = require("../util/method");

/**
 * ==================================================================================
 * @ROUTE /api/v1/projects/search-projects
 * @DES search projects
 * @Access Private
 * @Test yes
 * @Check yes
 * @Error no
 * @Method GET
 * ==================================================================================
 */
exports.searchProjects = catchAsync(async (req, res, next) => {
  const { search } = req.query;
  if (search === undefined) {
    return next(new ErrorClass("Input is not found", 400));
  }
  const results = await ProjectModel.find({
    projectName: { $regex: `^${search}`, $options: "i" }
  }).populate({
    path: "projectManager",
    select: "firstName lastName profileImage _id"
  });
  res
    .status(200)
    .json(
      successRes(
        search
          ? `Projects with :"${search}" is found!`
          : "Here are all the projects",
        results
      )
    );
}, 404);

/**
 * ==================================================================================
 * @ROUTE /api/v1/projects/get-project/:projectId
 * @DES get project
 * @Access Private
 * @Test yes
 * @Check yes
 * @Error no
 * @Method GET
 * ==================================================================================
 */
exports.getProject = catchAsync(async (req, res) => {
  const { project } = req;
  res
    .status(200)
    .json(successRes(`Project: ${project.projectName} is Found`, project));
}, 404);

/**
 * ==================================================================================
 * @ROUTE /api/v1/projects/create-project
 * @DES create project
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error no
 * @Method POST

 * ==================================================================================
 */
exports.createProject = catchAsync(async (req, res, next) => {
  const { projectName } = req.body;
  const { userId } = req.user;
  const currentUser = await UserModel.findById(userId);
  if (currentUser.project === undefined || currentUser.project === null) {
    const content = {
      projectName,
      projectManager: userId
    };
    const newProject = await ProjectModel.create(content);
    const currentProject = await ProjectModel.findById(newProject["_id"])
      .populate({
        path: "allStaff",
        select: "firstName lastName role profileImage createdAt username"
      })
      .populate({
        path: "projectManager",
        select: "firstName lastName role profileImage createdAt"
      });
    res.status(201).json(successRes("Project is created", currentProject));
  } else {
    return next(
      new ErrorClass(
        "Project is already created, we can only allow one project create per person for now.",
        404
      )
    );
  }
}, 404);
/**
 * ==================================================================================
 * @ROUTE /api/v1/projects/update-project/:projectId
 * @DES update project info
 * @Access Private
 * @Test No
 * @Check No
 * @Error no
 * @Method PUT
 * ==================================================================================
 */

exports.updateProject = catchAsync(async (req, res, next) => {
  const { projectName, projectManager } = req.body;
  const { userId } = req.user;
  const { projectId } = req.params;
  //Check if the project exits or not
  const content = undefineIfNotFound({
    projectName,
    projectManager
  });

  await ProjectModel.findByIdAndUpdate(projectId, content, {
    new: true,
    runValidators: true
  });

  if (projectManager !== userId && projectManager !== undefined) {
    await updateUserProjectId(userId, undefined);
    await updateUserProjectId(projectManager, projectId);
  }
  const newProject = await ProjectModel.findById(projectId)
    .populate({
      path: "allStaff",
      select: "firstName lastName role profileImage createdAt username"
    })
    .populate({
      path: "projectManager",
      select: "firstName lastName role profileImage createdAt"
    });
  res.status(200).json(successRes("Project is updated", newProject));
}, 404);
/**
 * ==================================================================================
 * @ROUTE /api/v1/projects/delete-project/:projectId
 * @DES delete project info
 * @Access Private
 * @Test no
 * @Check No
 * @Error no
 * ==================================================================================
 */
exports.deleteProject = catchAsync(async (req, res, next) => {
  const { project } = req;
  const { projectName } = project;
  await project.remove(); //it should remove all user project id automatically
  res.status(200).json(successRes(`${projectName} is removed`));
}, 404);
