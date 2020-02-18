const mongoose = require("mongoose");
//Connect Mongoose============================

const connectDB = async () => {
  try {
    const databaseConnectApp = process.env.MONGO_URL;
    const connection = await mongoose.connect(databaseConnectApp, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log(`Database Connected: ${connection.connection.host}`.inverse);
  } catch (err) {
    console.log("Not Connected! Error:", err);
  }
};
module.exports = connectDB;
//Connect Mongoose=============================
