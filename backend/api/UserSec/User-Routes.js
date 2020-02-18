const express = require("express");
const userRouter = express.Router();
const {
  secureRoute,
  checkIfUserIsThePMRoute
} = require("../middlewares/middlewares");
const {
  signin,
  signup,
  updateUser,
  getUser,
  forgotPassword,
  updatePassword,
  deleteUser,
  searchUsers,
  deleteUserFromAProject
} = require("./User-CRUD");

userRouter.route("/signup").post(signup);
userRouter.route("/forgotpassword").get(forgotPassword);
userRouter.route("/signin").post(signin);
userRouter.use(secureRoute);
userRouter.route("/search-users").get(searchUsers);
userRouter.route("/get-user").get(getUser); //get current user
userRouter.route("/delete-user").delete(deleteUser);
userRouter.route("/update-password").put(updatePassword);
userRouter.route("/update-user-info").put(updateUser);
userRouter
  .route("/delete-user-from-my-project/:currentUserId")
  .delete(checkIfUserIsThePMRoute, deleteUserFromAProject);

module.exports = userRouter;
