const mongoose = require("mongoose");
const {
  WaitingToStart,
  DesigningProcess,
  DevelopingProcess,
  TestingProcess,
  DebuggingProcess,
  Finish
} = require("../util/constantVar");
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please include a title for this task"]
  },
  status: {
    type: String,
    enum: [
      WaitingToStart,
      DesigningProcess,
      DevelopingProcess,
      TestingProcess,
      DebuggingProcess,
      Finish
    ],
    default: WaitingToStart
  },
  deadline: {
    type: Date,
    required: [true, "Please enter a deadline"],
    min: [Date.now() - 86400000, "Deadline can't be today or before today."]
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please assign this task to a person"]
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
    required: true
  },
  section: {
    type: mongoose.Schema.ObjectId,
    ref: "Section",
    required: true
  },
  updateAt: {
    type: Date,
    default: Date.now()
  },
  comment: {
    type: String
  }
});
TaskSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "profileImage firstName lastName role username"
  });
  next();
});
module.exports = mongoose.model("Task", TaskSchema);
