require("dotenv").config();
var express = require("express");
require("./dbconfig");
var model = require("./model");
var app = express();

var checkIfUserWins = require("./utils").checkIfUserWins;

app.get("/START/", function (req, res) {
  var newGame = new model({
    user1: 1, //yellow
    user2: 2, //red
    active: 1,
    gameMatrix: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  });
  newGame.save(function (err, result) {
    res.send({ status: "READY", gameId: result._id });
  });
});

app.get("/game/:id/:move/", function (req, res) {
  model.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) {
      res.status(500).send("Something went wrong!!!");
    } else if (!req.params.move || req.params.move > 6) {
      res.status(500).send("Not a valid move!");
    } else if (doc != null) {
      var move = Number(req.params.move);
      var emptyIndex = doc.gameMatrix[move].findIndex((x) => x == 0);
      if (emptyIndex == -1) {
        res.status(500).send("Not a valid move!");
      } else {
        doc.gameMatrix[move][emptyIndex] = doc.active;
        var userId = doc.active;
        var user = userId == 1 ? "Yellow" : "Red";
        var isWinner = checkIfUserWins(userId, doc.gameMatrix);
        if (isWinner) {
          res.send({
            isWinner: isWinner,
            msg: isWinner ? user + " wins" : "",
            matrix: doc.gameMatrix,
            next: isWinner ? "Game Over" : doc.active == 1 ? "Yellow" : "Red",
          });
        } else {
          doc.active = userId == 1 ? 2 : 1;
          doc.markModified("active");
          doc.markModified("gameMatrix");
          doc.save(function (err, r) {
            if (err) res.send("Something went wrong!");
            else {
              res.send({
                isWinner: isWinner,
                msg: isWinner ? user + " wins" : "",
                matrix: doc.gameMatrix,
                next: isWinner
                  ? "Game Over"
                  : doc.active == 1
                  ? "Yellow"
                  : "Red",
              });
            }
          });
        }
      }
    } else {
      res.status(500).send("Not a valid move!");
    }
  });
});

app.listen(5002, function () {
  console.log("Connect 4 API Connected!!!");
});
