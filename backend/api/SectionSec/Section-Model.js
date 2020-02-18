const mongoose = require("mongoose");
const SectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please include a title for this section"]
    },
    status: {
      type: Number //in percentage
    },
    deadline: {
      type: Date
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
      required: [true, "Please assign this section to a project"]
    },
    user: {
      //PM
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [
        true,
        "Please assign this section to a person to management this section"
      ]
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
SectionSchema.virtual("tasks", {
  ref: "Task", //referring to the data model
  localField: "_id", //Referring to the current model property type
  foreignField: "section", //referring to the data model's property
  justOne: false //don't have to be just one
});

//(optional) Everytime when you try to find using this data model it will do virtual populate
// SectionSchema.pre(/^find/, function(next) {

//   next();
// });

SectionSchema.pre("remove", async function(next) {
  await this.model("Task").deleteMany({ section: this._id });
  next();
});
module.exports = mongoose.model("Section", SectionSchema);
