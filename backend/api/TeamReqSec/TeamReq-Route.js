const express = require("express");
const teamReqRouter = express.Router();
const {
  createTeamRequest,
  getTeamRequest,
  updateTeamRequest
} = require("./TeamReq-CRUD");
const {
  identifyUserIsPMOrNot,
  secureRoute
} = require("../middlewares/middlewares");

teamReqRouter.use(secureRoute);

teamReqRouter
  .route("/create/:projectId")
  .post(identifyUserIsPMOrNot, createTeamRequest);

teamReqRouter.route("/get").get(getTeamRequest);

teamReqRouter.route("/update/:notificationId").put(updateTeamRequest);

module.exports = teamReqRouter;
