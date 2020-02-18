const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, "Please enter a project name"],
      unique: [
        true,
        "This Project name is taken, please create a different Project Name"
      ]
    },
    projectManager: {
      //PM
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [
        true,
        "Please assign this section to a person to management this project"
      ]
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
ProjectSchema.virtual("allStaff", {
  ref: "User", //referring to the data model
  localField: "_id", //Referring to the current model property type
  foreignField: "project", //referring to the data model's property
  justOne: false //don't have to be just one
});

ProjectSchema.virtual("allSections", {
  ref: "Section", //referring to the data model
  localField: "_id", //Referring to the current model property type
  foreignField: "project", //referring to the data model's property
  justOne: false //don't have to be just one
});

ProjectSchema.pre("save", async function(next) {
  await this.model("User").updateOne(
    { _id: this.projectManager },
    { $set: { project: this._id } }
  );
  next();
});

ProjectSchema.pre("remove", async function(next) {
  await this.model("User").updateMany(
    { project: this._id },
    { $set: { project: undefined } }
  );
  await this.model("TeamReq").deleteMany({ project: this["_id"] });
  await this.model("Section").deleteMany({ project: this["_id"] });
  await this.model("Task").deleteMany({ project: this["_id"] });

  next();
});
module.exports = mongoose.model("Project", ProjectSchema);
