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

module.exports = {
  checkIfUserWins: checkIfUserWins,
};
