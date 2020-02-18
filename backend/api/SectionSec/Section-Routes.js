const express = require("express");
const sectionRouter = express.Router();
const {
  checkIfUserIsThePMRoute,
  projectCRUDFilter,
  checkIfSectionExistsRoute,
  secureRoute
} = require("../middlewares/middlewares");
const {
  getAllSections,
  createSection,
  updateSection,
  deleteSection
} = require("./Section-CRUD");

sectionRouter.use(secureRoute);
sectionRouter
  .route("/get-sections/:projectId")
  .get(projectCRUDFilter, getAllSections);

sectionRouter
  .route("/create-section/:projectId")
  .post(projectCRUDFilter, checkIfUserIsThePMRoute, createSection);

sectionRouter
  .route("/update-section/:projectId/:sectionId")
  .put(
    projectCRUDFilter,
    checkIfUserIsThePMRoute,
    checkIfSectionExistsRoute,
    updateSection
  );
sectionRouter
  .route("/delete-section/:projectId/:sectionId")
  .delete(
    projectCRUDFilter,
    checkIfUserIsThePMRoute,
    checkIfSectionExistsRoute,
    deleteSection
  );
module.exports = sectionRouter;
