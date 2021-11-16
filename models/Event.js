const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    lat: {
      type: String,
      required: true
    },
    long: {
      type: Number,
      required: true
    },
    description: {
        type: String,
        ref: 'events'
    },
    hostId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },  
  }, {
    timestamps: true
  })

  module.exports = Event = mongoose.model("Event", EventSchema);