/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import axios from 'axios';
import BASE_API from '../api';
import {  toast } from 'react-toastify';

const EventForm = () => {
    const [formData, setFormData] = useState({
        clubName: '',
        clubCoordinator: '',
        contactNumber: '',
        eventName: '',
        eventDescription: '',
        eventDate: '',
        eventTime: '',
        venue: '',
        registrationLink: '',
        eventImage: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, eventImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { clubName, clubCoordinator, contactNumber, eventName, eventDescription, eventDate, eventTime, venue, registrationLink, eventImage } = formData;
    
        if (!(eventImage instanceof File)) {
            return;
        }
    
        const data = new FormData();
        data.append('clubName', clubName);
        data.append('clubCoordinator', clubCoordinator);
        data.append('contactNumber', contactNumber);
        data.append('eventName', eventName);
        data.append('eventDescription', eventDescription);
        data.append('eventDate', eventDate);
        data.append('eventTime', eventTime);
        data.append('venue', venue);
        data.append('registrationLink', registrationLink);
        data.append('eventImage', eventImage);
    
        try {
            const res = await axios.post(`${BASE_API}/events/addEvent`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Event Added")    
            // console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    

    return (
<form className="w-1/2 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8" onSubmit={handleSubmit}>
    <div className="mb-4">
        <h1 className='text-center text-xl text-black font-bold'>Club Details</h1>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clubName">
            Club Name
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-600"
            id="clubName"
            name="clubName"
            type="text"
            placeholder="Club Name"
            onChange={handleChange}
            required
        />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clubCoordinator">
            Club Coordinator
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-600"
            id="clubCoordinator"
            name="clubCoordinator"
            type="text"
            placeholder="Club Coordinator"
            onChange={handleChange}
            required
        />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
            Contact Number
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-600"
            id="contactNumber"
            name="contactNumber"
            type="text"
            placeholder="Contact Number"
            onChange={handleChange}
            required
        />
    </div>
    <h1 className='text-center text-xl text-black font-bold'>Event Details</h1>

    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
            Event Name
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-600"
            id="eventName"
            name="eventName"
            type="text"
            placeholder="Event Name"
            onChange={handleChange}
            required
        />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDescription">
            Event Description
        </label>
        <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-600"
            id="eventDescription"
            name="eventDescription"
            placeholder="Event Description"
            onChange={handleChange}
            required
        ></textarea>
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
            Event Date
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-600"
            id="eventDate"
            name="eventDate"
            type="date"
            onChange={handleChange}
            required
        />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventTime">
            Event Time
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-600"
            id="eventTime"
            name="eventTime"
            type="time"
            onChange={handleChange}
            required
        />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="venue">
            Venue
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-600"
            id="venue"
            name="venue"
            type="text"
            placeholder="Venue"
            onChange={handleChange}
            required
        />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationLink">
            Registration Link
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-600"
            id="registrationLink"
            name="registrationLink"
            type="text"
            placeholder="Registration Link"
            onChange={handleChange}
            required
        />
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventImage">
            Event Image
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-600"
            id="eventImage"
            name="eventImage"
            type="file"
            onChange={handleImageChange}
            required
        />
    </div>
    <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline placeholder:text-gray-600" type="submit">
                  Submit
              </button>
          </div>
      </form>
  );
  
};

export default EventForm;
