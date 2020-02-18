const TeamReqModel = require("./TeamReq-Model");
const UserModel = require("../UserSec/User-Model");
const { undefineIfNotFound } = require("../util/method");
const {
  catchAsync,
  successRes
} = require("../../Error&Res/controllerResponse");
const ErrorClass = require("../../Error&Res/ErrorClass");

/**
 * ==================================================================================
 * @ROUTE /api/v1/teamReq/create/:projectId
 * @DES Create a team request
 * @Access Private
 * @Test No
 * @Check No
 * @Error n/a
 * ==================================================================================
 */
exports.createTeamRequest = catchAsync(async (req, res, next) => {
  const { params, body, PM, user } = req;
  const { projectId } = params;
  const { sender, receiver, result } = body;
  const content = undefineIfNotFound({
    sender,
    receiver,
    project: projectId,
    result,
    updateAt: new Date(Date.now())
  });
  //Check if the notification exists
  const checkIfNotificationExists = await TeamReqModel.find({
    sender,
    receiver,
    project: projectId
  });

  const checkIfArrayHasRemove = array => {
    let ans = true;
    array.forEach(e => {
      if (e.result !== "remove") {
        ans = false;
      }
    });
    return ans;
  };
  if (
    checkIfNotificationExists.length !== 0 &&
    checkIfArrayHasRemove(checkIfNotificationExists) === false
  ) {
    return next(new ErrorClass("You already sent the request!", 404));
  }
  const currentUser = await UserModel.findById(user.userId);
  const currentReceiver = await UserModel.findById(receiver);
  //Identify if you are a PM through Teamreq-route.js
  //if not pm
  if (PM === false) {
    //you can send request to project only if you don't have a project
    //you can't send request if you have a project
    if (currentUser.project !== null) {
      return next(
        new ErrorClass(
          "You can't send request because you're currently working on a project",
          403
        )
      );
    }
  }
  //If pm
  else {
    if (
      currentReceiver.project !== undefined &&
      currentReceiver.project !== null
    ) {
      return next(
        new ErrorClass(
          "You can't send request to user who currently working on a project",
          403
        )
      );
      //you can't send request to user with project
      //Can send request to projects, only users
    }
  }
  await TeamReqModel.create(content);
  res.status(200).json(successRes("Request is sent"));
}, 404);

/**
 * ==================================================================================
 * @ROUTE /api/v1/teamReq/get
 * @DES get a team request
 * @Access Private
 * @Test No
 * @Check No
 * @Error n/a
 * ==================================================================================
 */
exports.getTeamRequest = catchAsync(async (req, res, next) => {
  const { userId } = req.user;

  const findDataReceiver = await TeamReqModel.find({
    receiver: userId
  })
    .populate({
      path: "receiver",
      select: "profileImage username _id"
    })
    .populate({
      path: "sender",
      select: "profileImage username _id"
    })
    .select("result project updateAt");
  const findDataSender = await TeamReqModel.find({
    sender: userId,
    result: { $ne: "nothing" }
  })
    .populate({
      path: "receiver",
      select: "profileImage username _id"
    })
    .populate({
      path: "sender",
      select: "profileImage username _id"
    })
    .select("result project updateAt");
  function compare(a, b) {
    const bandA = a.updateAt;
    const bandB = b.updateAt;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = -1;
    } else if (bandA < bandB) {
      comparison = 1;
    }
    return comparison;
  }
  const final = [...findDataReceiver, ...findDataSender].sort(compare);
  res
    .status(200)
    .json(
      successRes(
        final.length === 0 ? "No Notifications" : "All Notifications found",
        final
      )
    );
}, 404);

/**
 * ==================================================================================
 * @ROUTE /api/v1/teamReq/update/:notificationId
 * @DES update a team request
 * @Access Private
 * @Test No
 * @Check No
 * @Error n/a
 * ==================================================================================
 */
exports.updateTeamRequest = catchAsync(async (req, res, next) => {
  const { notificationId } = req.params;
  await TeamReqModel.findByIdAndUpdate(notificationId, req.body, {
    new: true,
    runValidators: true
  });
  const updatedData = await TeamReqModel.findById(notificationId)
    .populate({
      path: "receiver",
      select: "project"
    })
    .populate({
      path: "sender",
      select: "project"
    });
  const { sender, receiver } = updatedData;
  if (!receiver.project) {
    await UserModel.findByIdAndUpdate(receiver["_id"], {
      project: sender.project
    });
  }
  if (!sender.project) {
    await UserModel.findByIdAndUpdate(sender["_id"], {
      project: receiver.project
    });
  }

  res.status(200).json(successRes("Your response is updated"));
}, 404);

//Delete notification only happens when the project is deleted.
