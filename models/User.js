const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//consider doing the events, friends in the []

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String
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
        friendId: Schema.Types.ObjectId,
        friendName: String,
        friendEmail: String,
        friendImage: String,
        status: String
      },
    ],
    requestsReceived: [
      {
        requesterId: Schema.Types.ObjectId,
        requesterName: String,
        requesterEmail: String,
        requesterImage: String,
        status: String
      }
    ],
    requestsSent: [
      {
        recipientId: Schema.Types.ObjectId,
        recipientName: String,
        recipientEmail: String,
        recipientImage: String,
        status: String
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
