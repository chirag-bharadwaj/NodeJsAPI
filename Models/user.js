const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    age: {
      type: Number,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
