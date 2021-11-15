const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    eventsPlanned: {
        type: Schema.Types.ObjectId,
        ref: 'events'
    },
    eventsHosted: {
        type: Schema.Types.ObjectId,
        ref: 'events'
    },
    friends: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
  }, {
    timestamps: true
  })

  module.exports = User = mongoose.model("User", UserSchema);
