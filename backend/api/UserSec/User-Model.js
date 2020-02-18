const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a your username"],
    unique: [true, "This username is taken, please choose a different username"]
  },
  firstName: {
    type: String,
    required: [true, "Please enter a first name"]
  },
  lastName: {
    type: String,
    required: [true, "Please enter a last name"]
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please add a valid Email"],
    required: [true, "Please enter a email"],
    lowercase: true,
    unique: [true, "This email address is already in use."]
  },
  company: {
    type: String
  },
  role: {
    type: String,
    required: [true, "What's your role as a developer?"]
  },
  profileImage: {
    type: String
  },
  provinceOrState: {
    type: String,
    required: [true, "Tell us your province or state"]
  },
  country: {
    type: String,
    required: [true, "Tell us your country"]
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project"
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpiration: Date,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

//Encrypt the Password using Bcrypt
UserSchema.pre("save", async function(next) {
  //1) Check if the password has modified
  if (this.isModified("password")) {
    //2) HASH the password
    this.password = await bcrypt.hash(this.password, 12);
  }
  this.profileImage = `https://api.adorable.io/avatars/285/${this.username}.png`;
  next();
});

UserSchema.methods.createPasswordReset = function() {
  const resetToken = crypto.randomBytes(32).toString("hex"); //Generate a random Cryto String
  this.password = resetToken;
  // this.resetPasswordToken = crypto
  //   .createHash("sha256") //hash algorithm
  //   .update(resetToken)
  //   .digest("hex");

  // this.resetPasswordExpiration = Date.now() + 20 * 60 * 1000; //We add 20 min on top of current time
  return resetToken;
};

//Delete Project and task user id
UserSchema.pre("remove", async function(next) {
  await this.model("Project").deleteOne({ projectManager: this["_id"] });
  await this.model("Task").deleteMany({ user: this["_id"] });
  await this.model("Section").deleteMany({ project: this.project });
  await this.model("TeamReq").deleteMany({
    $and: [
      { project: this["project"] },
      { $or: [{ sender: this["_id"] }, { receiver: this["_id"] }] }
    ]
  });
  next();
});
module.exports = mongoose.model("User", UserSchema);
