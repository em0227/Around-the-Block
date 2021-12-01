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
    eventsJoined: [
      {
        type: Schema.Types.ObjectId,
        ref: "events",
      },
    ],

    eventsHosted: [
      {
        type: Schema.Types.ObjectId,
        ref: "events",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    requestsReceived: [
      {
        requesterId: Schema.Types.ObjectId,
        requesterName: String,
        requesterEmail: String,
        status: String
      }
    ],
    requestsSent: [
      {
        recipientId: Schema.Types.ObjectId,
        recipientName: String,
        recipientEmail: String,
        status: String
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
