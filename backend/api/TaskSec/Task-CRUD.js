const TaskModel = require("./Task-Model");
const getSectionsFunction = require("../SectionSec/getSectionFunction");
const { undefineIfNotFound } = require("../util/method");
const {
  catchAsync,
  successRes
} = require("../../Error&Res/controllerResponse");
const ErrorClass = require("../../Error&Res/ErrorClass");
const {
  checkIfContentUpdated,
  checkIfContentDeleted
} = require("../util/method");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ODD ONE
/**
 * ==================================================================================
 * @ROUTE /api/v1/tasks/get-tasks/:projectId
 * @DES Get all tasks from entire project
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error n/a
 * @Method GET
 * ==================================================================================
 */
exports.getAllTasks = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;

  const allTasks = await TaskModel.find({ project: projectId }).populate({
    path: "section",
    select: "title"
  });
  if (!allTasks) {
    return next(new ErrorClass("This project have no tasks.", 404));
  }
  res
    .status(200)
    .json(successRes(`All Tasks under this project is found`, allTasks));
}, 404);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ODD ONE

/**
 * ==================================================================================
 * @ROUTE /api/v1/tasks/create-task/:projectId/:sectionId
 * @DES Create a single task under one section
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error n/a
 * @Method POST
 * ==================================================================================
 */
exports.createATask = catchAsync(async (req, res, next) => {
  const { sectionId, projectId } = req.params;
  const { userId } = req.user;
  const { title, deadline, user, status } = req.body;
  const content = undefineIfNotFound({
    title,
    deadline,
    user,
    section: sectionId,
    status,
    project: projectId
  });
  if (!content.user) {
    content.user = userId;
  }
  content.updateAt = Date.now();
  //Find tasks under this user
  const newTask = await TaskModel.create(content);
  if (!newTask) {
    return next(new ErrorClass("Fail to create the task", 400));
  }
  const allSections = await getSectionsFunction(projectId, next);
  res.status(200).json(successRes("Task is created", allSections));
}, 404);

/**
 * ==================================================================================
 * @ROUTE /api/v1/tasks/update-task/:projectId/:sectionId/:taskId
 * @DES Update a single task under one section
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error n/a
 * @Method PUT
 * ==================================================================================
 */
exports.updateTask = catchAsync(async (req, res, next) => {
  const { params, task, PM, body } = req;
  const { taskId, projectId } = params;
  let content = null;
  if (PM) {
    const { title, deadline, sectionId, user, status, comment } = body;
    content = undefineIfNotFound({
      title,
      deadline,
      user,
      section: sectionId,
      status,
      comment
    });
  } else {
    content = undefineIfNotFound({
      status: body.status,
      comment: body.comment
    });
  }
  content.updateAt = Date.now();

  //4)Find tasks under this user
  await TaskModel.findByIdAndUpdate(taskId, content, {
    new: true,
    runValidators: true
  });
  const currentTask = await TaskModel.findById(taskId);
  checkIfContentUpdated(currentTask, task, next);
  const allSections = await getSectionsFunction(projectId, next);

  res.status(200).json(successRes(`Task is updated`, allSections));
}, 404);

/**
 * ==================================================================================
 * @ROUTE /api/v1/tasks/delete-task/:projectId/:sectionId/:taskId
 * @DES Delete a single task under one section
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error n/a
 * @Method DELETE
 * ==================================================================================
 */
exports.deleteTask = catchAsync(async (req, res, next) => {
  const { taskId, projectId } = req.params;
  const currentTask = await TaskModel.findById(taskId);
  await currentTask.remove();
  await checkIfContentDeleted(taskId, "task", next);
  const allSections = await getSectionsFunction(projectId, next);

  res.status(200).json(successRes(`Task is deleted`, allSections));
}, 404);
