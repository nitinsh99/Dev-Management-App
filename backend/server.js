const color = require("colors");
const path = require("path");
//Imports=====
const express = require("express");
const ErrorMainHandler = require("./Error&Res/ErrorHanding");
//Connect the Config=========
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
//Connect to Database function call============
const connetDB = require("./config/connectDB");
connetDB();
//Routes===========
const app = express();
app.use(express.json()); //Simple Middleware<--- It parsing json obj.
app.use("/api/v1/users", require("./api/UserSec/User-Routes"));
app.use("/api/v1/projects", require("./api/ProjectSec/Project-Routes"));
app.use("/api/v1/tasks", require("./api/TaskSec/Task-Route"));
app.use("/api/v1/sections", require("./api/SectionSec/Section-Routes"));
app.use("/api/v1/teamReq", require("./api/TeamReqSec/TeamReq-Route"));
//Error Handler=======
app.use(ErrorMainHandler); //Main Function to Handle the Functions
//Port
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/../frontend/build/index.html"));
  });
}
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} & PORT is on ${PORT}`
      .bgBrightBlue.black
  );
});
