const SectionModel = require("./Section-Model");
const { undefineIfNotFound } = require("../util/method");
const {
  catchAsync,
  successRes
} = require("../../Error&Res/controllerResponse");
const ErrorClass = require("../../Error&Res/ErrorClass");
const getSectionsFunction = require("./getSectionFunction");
const {
  checkIfContentUpdated,
  checkIfContentDeleted
} = require("../util/method");
/**
 * ==================================================================================
 * @ROUTE /api/v1/sections/get-sections/:projectId
 * @DES Get all sections under one project
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error n/a
 * @Method GET
 * ==================================================================================
 */
exports.getAllSections = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const allSections = await getSectionsFunction(projectId, next);
  res.status(200).json(successRes("All Sections found", allSections));
}, 404);

/**
 * ==================================================================================
 * @ROUTE /api/v1/sections/create-section/:projectId
 * @DES Create one section under one project
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error n/a
 * @Method POST

 * ==================================================================================
 */
exports.createSection = catchAsync(async (req, res, next) => {
  const { title, user } = req.body;
  const { userId } = req.user;
  const { projectId } = req.params;

  const newContent = undefineIfNotFound({ title, user });
  if (newContent.user === undefined) {
    newContent.user = userId;
  }
  newContent.project = projectId;
  const newSection = await SectionModel.create(newContent);
  if (!newSection) {
    return next(new ErrorClass("Fail to create the section", 404));
  }
  const allSections = await getSectionsFunction(projectId, next);

  res.status(201).json(successRes("Section is created", allSections));
}, 404);

/**
 * ==================================================================================
 * @ROUTE /api/v1/sections/update-section/:projectId/:sectionId
 * @DES Update one section under one project
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error n/a
 * @Method PUT
 * ==================================================================================
 */
exports.updateSection = catchAsync(async (req, res, next) => {
  const { body, section, params } = req;
  const { title, user } = body;
  const { sectionId, projectId } = params;
  const currentSection = await SectionModel.findById(sectionId);

  const newContent = undefineIfNotFound({ title, user });
  await SectionModel.findByIdAndUpdate(sectionId, newContent, {
    new: true,
    runValidators: true
  });

  //Check content

  checkIfContentUpdated(currentSection, section, next);

  const allSections = await getSectionsFunction(projectId, next);

  res.status(200).json(successRes("Section is updated", allSections));
}, 404);

/**
 * ==================================================================================
 * @ROUTE /api/v1/sections/delete-section/:projectId/:sectionId
 * @DES Delete one section under one project
 * @Access Private
 * @Test Yes
 * @Check Yes
 * @Error n/a
 * @Method DELETE
 * ==================================================================================
 */
exports.deleteSection = catchAsync(async (req, res, next) => {
  const { section, params } = req;
  const { projectId, sectionId } = params;
  const { title } = section;
  await section.remove();
  await checkIfContentDeleted(sectionId, "section", next);
  const allSections = await getSectionsFunction(projectId, next);
  res.status(200).json(successRes(`${title} is deleted`, allSections));
}, 404);
