const express = require("express");
const projectRouter = express.Router();
const {
  checkIfUserIsThePMRoute,
  projectCRUDFilter,
  secureRoute
} = require("../middlewares/middlewares");
const {
  getProject,
  // updateProject,
  deleteProject,
  createProject,
  searchProjects
} = require("./Project-CRUD");

projectRouter.use(secureRoute);
projectRouter.route("/create-project").post(createProject);

projectRouter.route("/search-projects").get(searchProjects);

projectRouter
  .route("/get-project/:projectId")
  .get(projectCRUDFilter, getProject);
//Upcoming Features!
// projectRouter
//   .route("/update-project/:projectId")
//   .put(projectCRUDFilter, checkIfUserIsThePMRoute, updateProject);
projectRouter
  .route("/delete-project/:projectId")
  .delete(projectCRUDFilter, checkIfUserIsThePMRoute, deleteProject);

module.exports = projectRouter;
