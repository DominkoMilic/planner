const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  username: { type: String, required: true, unique: true },
  googleId: { type: String },
  plans: [
    {
      date: { type: Date },
      color: { type: String },
      text: { type: String },
    },
  ],
});

module.exports = mongoose.model("plannerUser", UserSchema);
