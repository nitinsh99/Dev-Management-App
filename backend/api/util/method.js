const ErrorClass = require("../../Error&Res/ErrorClass");
const SectionModel = require("../SectionSec/Section-Model");
const TaskModel = require("../TaskSec/Task-Model");
const UserModel = require("../UserSec/User-Model");
const { jwtTokenGenerator } = require("../jwtSec/jwtMethods");

exports.checkIdExists = id => {
  if (id.charAt(0) === ":") {
    return false;
  }
  return true;
};

exports.checkIfContentUpdated = (updateObject, oldObject, next) => {
  let total = 0;
  let current = 0;
  for (let [key, value] of Object.entries(oldObject)) {
    total += 1;
    if (updateObject[key] === value) {
      current += 1;
    }
  }
  if (total === current) {
    next(new ErrorClass("Nothing is updated", 404));
  }
};

exports.checkIfContentDeleted = async (id, type, next) => {
  let res = null;
  switch (type) {
    case "section":
      res = await SectionModel.findById(id);
      break;
    case "task":
      res = await TaskModel.findById(id);
    default:
      break;
  }
  if (res) {
    next(new ErrorClass("Nothing is Deleted", 404));
  }
};
exports.undefineIfNotFound = body => {
  let newObject = {};
  for (const key in body) {
    if (body[key] !== undefined) {
      newObject[key] = body[key];
      if (key === "email") {
        newObject[key] = body[key].toLowerCase().trim();
      }
    }
  }
  return newObject;
};
exports.updateUserProjectId = async (userId, projectId) => {
  await UserModel.findByIdAndUpdate(
    userId,
    { project: projectId },
    {
      new: true,
      runValidators: true
    }
  );
};

exports.resetPasswordFunction = async (userData, password) => {
  // Replace the input password to the current password
  userData.password = password;
  userData.resetPasswordToken = undefined;
  userData.resetPasswordExpiration = undefined;
  await userData.save();
  const newJWTToken = jwtTokenGenerator(userData["_id"]);
  return newJWTToken;
};
