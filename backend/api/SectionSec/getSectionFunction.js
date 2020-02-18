const ErrorClass = require("../../Error&Res/ErrorClass");
const SectionModel = require("./Section-Model");

const getSectionsFunction = async (projectId, next) => {
  const allSections = await SectionModel.find({ project: projectId }).populate({
    path: "tasks",
    select: "status title deadline user createdAt comment updateAt"
  });
  if (!allSections) {
    return next(new ErrorClass("No sections under this project", 404));
  }
  return allSections;
};

module.exports = getSectionsFunction;
