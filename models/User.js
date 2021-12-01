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
        friendId: Schema.Types.ObjectId,
        friendName: String,
        friendEmail: String,
        status: String
      },
    ],
    requestsReceived: [
      {
<<<<<<< HEAD
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
=======
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
>>>>>>> snigdha_finishing_friend_requests
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
