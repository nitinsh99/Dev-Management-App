const mongoose = require("mongoose");
const { accept, decline, nothing, remove } = require("../util/constantVar");
const TeamReq = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Who is the sender?"]
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Who is the receiver?"]
  },
  result: {
    type: String,
    enum: [accept, decline, nothing, remove],
    default: nothing
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
    required: [true, "What is the project id"]
  },
  updateAt: {
    type: Date
  }
});

module.exports = mongoose.model("TeamReq", TeamReq);
