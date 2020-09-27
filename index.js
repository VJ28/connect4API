var express = require("express");
require("./dbconfig");
var model = require("./model");
var app = express();

app.get("/START/", function (req, res) {
  console.log("create");
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

var checkIfUserWins = function (userId, matrix) {
  var isWinner = false;
  for (j = 3; j < 7; j++) {
    for (var i = 3; i < 6; i++) {
      if (
        userId == matrix[j - 3][i - 3] &&
        userId == matrix[j - 2][i - 2] &&
        userId == matrix[j - 1][i - 1] &&
        userId == matrix[j][i]
      ) {
        isWinner = true;
        break;
      }
    }
    if (isWinner) break;
  }
  for (j = 3; j < 7; j++) {
    for (var i = 0; i < 6; i++) {
      if (
        userId == matrix[j - 3][i] &&
        userId == matrix[j - 2][i] &&
        userId == matrix[j - 1][i] &&
        userId == matrix[j][i]
      ) {
        isWinner = true;
        break;
      }
    }
    if (isWinner) break;
  }
  for (j = 6; j >= 3 && !isWinner; j--) {
    for (var i = 3; i < 6; i++) {
      if (
        userId == matrix[j][i - 3] &&
        userId == matrix[j - 1][i - 2] &&
        userId == matrix[j - 2][i - 1] &&
        userId == matrix[j - 3][i]
      ) {
        isWinner = true;
        break;
      }
    }
    if (isWinner) break;
  }
  for (j = 0; j < 7 && !isWinner; j++) {
    for (var i = 3; i < 6; i++) {
      if (
        userId == matrix[j][i - 3] &&
        userId == matrix[j][i - 2] &&
        userId == matrix[j][i - 1] &&
        userId == matrix[j][i]
      ) {
        isWinner = true;
        break;
      }
    }
    if (isWinner) break;
  }
  return isWinner;
};

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
        doc.active = userId == 1 ? 2 : 1;
        doc.markModified("active");
        doc.markModified("gameMatrix");
        doc.save(function (err, r) {
          if (err) res.send("Something went wrong!");
          else {
            var isWinner = checkIfUserWins(userId, doc.gameMatrix);
            res.send({
              isWinner: isWinner,
              msg: isWinner ? user + " wins" : "",
              matrix: doc.gameMatrix,
              next: isWinner ? "Game Over" : doc.active == 1 ? "Yellow" : "Red",
            });
          }
        });
      }
    } else {
      res.status(500).send("Not a valid move!");
    }
  });
});

app.listen(5002, function () {
  console.log("Connect 4 API Connected!!!");
});
