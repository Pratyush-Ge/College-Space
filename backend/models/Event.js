import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 1000,
  },
  link: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
