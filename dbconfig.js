var mongoose = require("mongoose");
var dbRoute =
  "mongodb+srv://vijay:vijaymourya@cluster0-nsvjo.mongodb.net/connect4?retryWrites=true&w=majority";

mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true });
var dbConnection = mongoose.connection;
dbConnection.once("open", function () {
  console.log("connected to the database");
});
dbConnection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

module.exports = dbConnection;
