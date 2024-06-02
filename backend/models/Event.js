import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    clubName: { type: String, required: true },
    clubCoordinator: { type: String, required: true },
    contactNumber: { type: String, required: true },
    eventName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    venue: { type: String, required: true },
    registrationLink: { type: String, required: true },
    eventImage: { type: String, required: true }
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
