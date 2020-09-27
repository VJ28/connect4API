var mongoose = require("mongoose");

mongoose.connect(process.env.DBRoute, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
var dbConnection = mongoose.connection;
dbConnection.once("open", function () {
  console.log("connected to the database");
});
dbConnection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

module.exports = dbConnection;
