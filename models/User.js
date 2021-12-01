const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//consider doing the events, friends in the []
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    requestsReceived: [
      {
        type: Schema.Types.ObjectId,
        ref: "requests",
      },
    ],
    requestsSent: [
      {
        type: Schema.Types.ObjectId,
        ref: "requests",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
