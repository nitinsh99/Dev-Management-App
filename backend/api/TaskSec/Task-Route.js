const express = require("express");
const taskRouter = express.Router();
const {
  projectCRUDFilter,
  checkIfSectionExistsRoute,
  checkIfUserIsThePAMorPMRoute,
  checkIfTaskExists,
  identifyUserIsPMOrNot,
  secureRoute
} = require("../middlewares/middlewares");
const {
  getAllTasks,
  createATask,
  deleteTask,
  updateTask
} = require("./Task-CRUD");

taskRouter.use(secureRoute);

taskRouter.route("/get-tasks/:projectId").get(projectCRUDFilter, getAllTasks);

taskRouter
  .route("/create-task/:projectId/:sectionId")
  .post(
    projectCRUDFilter,
    checkIfSectionExistsRoute,
    checkIfUserIsThePAMorPMRoute,
    createATask
  );

taskRouter
  .route("/update-task/:projectId/:sectionId/:taskId")
  .put(
    projectCRUDFilter,
    checkIfSectionExistsRoute,
    checkIfTaskExists,
    identifyUserIsPMOrNot,
    updateTask
  );
taskRouter
  .route("/delete-task/:projectId/:sectionId/:taskId")
  .delete(
    projectCRUDFilter,
    checkIfSectionExistsRoute,
    checkIfUserIsThePAMorPMRoute,
    checkIfTaskExists,
    deleteTask
  );

module.exports = taskRouter;
