import Event from '../models/Event.js';
import cloudinary from '../config/cloudinary.js';
import { extractPublicId } from 'cloudinary-build-url';

export const createEvent = async (req, res) => {
  try {
    const { eventName, eventDate, description, link } = req.body;
    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newEvent = new Event({
      eventName,
      eventDate,
      description,
      link,
      imageUrl,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (deletedEvent.imageUrl) {
      const publicId = extractPublicId(deletedEvent.imageUrl);
      await cloudinary.uploader.destroy(publicId);
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
