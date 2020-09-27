var moongoose = require("mongoose");

var DataSchema = new moongoose.Schema({
  user1name: { type: String, default: "Yellow" },
  user2name: { type: String, default: "Red" },
  user1: String,
  user2: String,
  active: { type: Number, default: 1 },
  gameMatrix: Array,
});

module.exports = moongoose.model("Game", DataSchema);
