const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  requesterId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  requesterName:{
    type: String,
    required: true
  },
  requesterEmail:{
    type: String,
    required: true
  },
  requesterImage:{
    type: String
    
  },
  recipientId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  recipientName: {
    type: String,
    required: true
  },
  recipientEmail: {
    type: String,
    required: true 
  },
  recipientImage: {
    type: String
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = FriendRequest = mongoose.model(
  "FriendRequest",
  FriendRequestSchema
);
